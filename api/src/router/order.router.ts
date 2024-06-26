import { NextFunction, Router } from "express";
import OrderController from "@/controller/order.controller";
import { Logger } from "@/util/logger";

const orderController = new OrderController();

const router = Router();
router.post("/checkProductQuantities", (req, res, next: NextFunction) => {
  // res.send({ message: "Check product quantities" });
    orderController.checkProductQuantities(req, res, next);
  }
);
router.post("/orders", (req, res, next: NextFunction) => {
   orderController.create(req, res, next);
});
  

export default router;