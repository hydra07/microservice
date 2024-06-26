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

export default class OrderController extends BaseController<Order> {
  private orderService: OrderService;

  constructor() {
    const userService = new UserService();
    const productService = new ProductService();
    const service = new OrderService(userService, productService);
    super(service);
    this.orderService = service;
  }

  /**
   * Creates a new order.
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next middleware function
   */
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
}
