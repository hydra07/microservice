import { NotFoundError, InsufficientQuantityError } from "@/errors";
import { PostgresDataSource } from "../config/db.config";
import { Logger } from "@/util/logger";
import { Order } from "@/entity/order.entity";
import BaseService from "./baseService";
import UserService from "./user.service";
import ProductService from "./product.service";
import { notificationService } from "@/config/socket.config";
import {
  CreateOrderDto,
  CreateOrderItemDto,
} from "@/dto/create-order-item.dto";
import { OrderItem } from "@/entity/orderItem.entity";
import { EntityManager, In } from "typeorm";
import { Product } from "@/entity/product.entity";
import moment from "moment";

/**
 * Represents the result of an order creation attempt.
 */
interface OrderCreationResult {
  order: Order | null;
  insufficientProducts: number[];
}

/**
 * Service responsible for handling order-related operations.
 * @extends BaseService<Order>
 */
export class OrderService extends BaseService<Order> {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService
  ) {
    super(Order);
  }

  /**
   * Converts a CreateOrderDto to an Order entity.
   * @param {CreateOrderDto} createOrderDto - The DTO containing order creation data.
   * @returns {Promise<Order>} The created Order entity.
   * @throws {NotFoundError} If the user is not found.
   */
  private async dtoToEntity(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userService.findUserById(createOrderDto.userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const order = Object.assign(new Order(), {
      id: createOrderDto.id,
      user,
      name: createOrderDto.name,
      shipAddress: createOrderDto.shipAddress,
      phone: createOrderDto.phone,
      email: createOrderDto.email,
      paymentMethod: createOrderDto.paymentMethod,
      createdAt: new Date(),
      status: "pending",
    });
    
    return order;
  }

  /**
   * Checks if there's sufficient quantity for all products in the order.
   * @param {CreateOrderItemDto[]} orderItems - The order items to check.
   * @returns {Promise<number[]>} An array of product ids with insufficient quantity.
   */
  async checkProductQuantities(
    orderItems: CreateOrderItemDto[]
  ): Promise<number[]> {
    const productIds = orderItems.map((item) => item.productId);
    const products = await this.productService.getMultiple({
      where: { id: In(productIds) },
    });

    const insufficientProductIds = products
      .filter((product) => {
        const orderItem = orderItems.find(
          (item) => item.productId === product.id
        );
        return !orderItem || product.currentQuantity < orderItem.quantity;
      })
      .map((product) => product.id);

    return insufficientProductIds;
  }

  /**
   * Creates order items and calculates the total order amount.
   * @param {EntityManager} transactionalEntityManager - The transaction manager.
   * @param {CreateOrderDto} createOrderDto - The DTO containing order creation data.
   * @returns {Promise<Order>} The created order with items.
   * @throws {NotFoundError} If a product is not found.
   */
  private async createOrderItems(
    transactionalEntityManager: EntityManager,
    createOrderDto: CreateOrderDto
  ): Promise<Order> {
    const order = await this.dtoToEntity(createOrderDto);

    const productMap = new Map(
      (
        await this.productService.getMultiple({
          where: {
            id: In(createOrderDto.orderItems.map((item) => item.productId)),
          },
        })
      ).map((product) => [product.id, product])
    );

    order.orderItems = createOrderDto.orderItems.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) {
        throw new NotFoundError(`Product with id ${item.productId} not found`);
      }
      return Object.assign(new OrderItem(), {
        product,
        quantity: item.quantity,
        subtotal: item.subtotal,
      });
    });

    // Update product quantities
    for (const item of order.orderItems) {
      const product = productMap.get(item.product.id);
      if (product) {
        product.currentQuantity -= item.quantity;
        await transactionalEntityManager.save(product);
      }
    }

    order.total = order.orderItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
    return await transactionalEntityManager.save(order);
  }

  /**
   * Handles the creation of a new order.
   * @param {CreateOrderDto} createOrderDto - The DTO containing order creation data.
   * @returns {Promise<OrderCreationResult>} The result of the order creation attempt.
   * @throws {Error} If order creation fails for any reason other than insufficient quantity.
   */
  async handleCreateOrder(
    createOrderDto: CreateOrderDto
  ): Promise<OrderCreationResult> {
    try {
      if(!createOrderDto.id){
        const date = new Date();
        createOrderDto.id = parseInt( moment(date).format("DDHHmmss"));
      }
      return await PostgresDataSource.transaction(
        async (transactionalEntityManager) => {
          const insufficientProducts = await this.checkProductQuantities(
            createOrderDto.orderItems
          );

          if (insufficientProducts.length > 0) {
            return { order: null, insufficientProducts };
          }

          const order = await this.createOrderItems(
            transactionalEntityManager,
            createOrderDto
          );
          return { order, insufficientProducts: [] };
        }
      );
    } catch (error) {
      Logger.error("Order creation failed", error);
      throw error;
    }
  }

  async updateOrderStatus(orderId: number, status: string, reason?: string) {
    const ALLOWED_STATUSES = ["shipping", "rejected", "completed" , "cancelled", "cancelling", "unsuccess"];

    const STATUS_MESSAGE: { [key: string]: string } = {
      shipping: "đang được vận chuyển",
      rejected: "bị từ chối",
      completed: "hoàn thành",
      cancelled: "đã được hủy",
      cancelling: "đang chờ xác nhận hủy",
      unsuccess: "không được giao thành công",
    };

    if (!ALLOWED_STATUSES.includes(status)) {
      throw new Error("Invalid status");
    }

    const order = await this.repository.findOneBy({ id: orderId });

    if (!order) {
      throw new Error("Order not found");
    }

    order.status = status;
    await order.save();

    //update product quantity
    if (status === "cancelled") {
      for (const item of order.orderItems!) {
        const product = await this.productService.getSingle({
          where: { id: item.product.id },
        });
        product!.currentQuantity += item.quantity;
        await product!.save();
      }
    }

    const notificationTitle = `Cập nhật đơn hàng #${order.id}`;

    let notificationContent = `Đơn hàng của bạn hiện tại ${STATUS_MESSAGE[status]}`;
    if (status === "rejected" && reason) {
      notificationContent += ` với lý do: ${reason}`;
    }

    await notificationService.createNotification({
      title: notificationTitle,
      content: notificationContent,
      userId: order.user?.id,
      createdAt: new Date(),
    });

    return order;
  }
}
