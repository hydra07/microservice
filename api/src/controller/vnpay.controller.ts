import { NextFunction, Request, Response } from "express";
import VnpayService from "@/service/vnpay.service";
import { Logger } from "@/util/logger";

export default class VnpayController {
  private vnpayService = new VnpayService();

  createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { amount } = req.body;

      console.log("Amount: ", amount);

      const ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        "127.0.0.1";

      const vnpayUrl = this.vnpayService.createPaymentUrl(
        amount,
        ipAddr.toString()
      );
      res.status(200).json({ vnpayUrl });
    } catch (error) {
      next(error);
    }
  }

  vnpayIpn(req: Request, res: Response, next: NextFunction) {
    res.send({ message: "Vnpay ipn" });
  }

  async vnpayReturn(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.vnpayService.processReturn(req.query);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to process return" });
    }
  }

  async refund(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.body.orderId;
      const createBy = req.body.createBy;
      console.error(`refund order ${orderId}`);
      const ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        "127.0.0.1";
      const result = await this.vnpayService.vnpayRefund(
        "03132659", // orderId
        "user123", // createBy
        ipAddr.toString()
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
