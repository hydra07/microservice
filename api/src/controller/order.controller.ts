import { OrderService } from "@/service/order.service";
import { BaseController } from "./baseController";
import { Order } from "@/entity/order.entity";
import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import {
  CreateOrderDto,
  CreateOrderItemDto,
} from "@/dto/create-order-item.dto";
import { validate } from "class-validator";
import { Logger } from "@/util/logger"; // Assume you have a logger utility
import ProductService from "@/service/product.service";
import UserService from "@/service/user.service";
import { FindOneOptions, In } from "typeorm";
import { OrderType } from "@/@types/order";

export default class OrderController extends BaseController<Order> {
  private orderService: OrderService;

  constructor() {
    const userService = new UserService();
    const productService = new ProductService();
    const service = new OrderService(userService, productService);
    super(service);
    this.orderService = service;
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orderData = plainToClass(CreateOrderDto, req.body);
      const errors = await validate(orderData);

      if (errors.length > 0) {
        Logger.warn("Validation failed for order creation", errors);
        res.status(400).json(errors);
        return;
      }

      const result = await this.orderService.handleCreateOrder(orderData);
      res.status(201).json(result);
    } catch (error) {
      Logger.error("Failed to create order", error);
      next(error);
    }
  }

  async checkProductQuantities(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const orderItems = req.body;
    const errors = await validate(orderItems);

    try {
      const insufficientProducts =
        await this.orderService.checkProductQuantities(orderItems);
      res.status(200).json(insufficientProducts);
    } catch (error) {
      Logger.error("Failed to check product quantities", error);
      next(error);
    }
  }

  async findOrderByUserAndStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.query.userId as string;
      const status = req.query.status as string;
      const statuses =
        status === "pending" ? ["pending", "cancelling"] : [status];
      const options: FindOneOptions<Order> = {
        where: { user: { id: userId }, status: In(statuses) },
      };
      const orders = await this.orderService.findByOptions(options);
      const data = orders.map((order) => this.transformOrderData(order));
      res.status(200).json(data);
    } catch (error) {
      Logger.error("Failed to find order", error);
      next(error);
    }
  }

  async updateOrderStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const orderId = req.params.id;
    const { status, reason } = req.body;

    try {
      const order = await this.orderService.updateOrderStatus(
        parseInt(orderId),
        status,
        reason
      );
      res.status(200).json(this.transformOrderData(order));
    } catch (error) {
      Logger.error("Failed to update order status", error);
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const entities = await this.orderService.getAll();
      const data = entities.map((order) => this.transformOrderData(order));
      res.status(200).json(data);
    } catch (error) {
      Logger.error("Failed to get all orders", error);
      next(error);
    }
  }

  transformOrderData(data: any): OrderType {
    return {
      id: data.id,
      userId: data.user.id,
      createAt: data.createdAt,
      shipDate: data.shipDate ?? undefined,
      total: data.total,
      status: data.status,
      orderItems: data.orderItems.map((item: any) => ({
        id: item.id,
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.imgProducts[0]?.imageUrl || "",
        isRated: item.isRated
      })),
      name: data.name,
      phone: data.phone,
      email: data.email,
      paymentMethod: data.paymentMethod,
      shipAddress: data.shipAddress,
    };
  }
}
