import { NextFunction, Router } from "express";
import OrderController from "@/controller/order.controller";
import { Logger } from "@/util/logger";
import { resolveIndexId } from "@/middleware";

const orderController = new OrderController();

const router = Router();
router.get("/orders", (req, res, next: NextFunction) => {
  orderController.getAll(req, res, next);
});
router.get("/orders/userOrders", (req, res, next: NextFunction) => {
  orderController.findOrderByUserAndStatus(req, res, next);
});

router.get("/orders/:id", resolveIndexId, (req, res, next: NextFunction) => {
  orderController.getSingle(req, res, next);
});



router.post("/checkProductQuantities", (req, res, next: NextFunction) => {
  // res.send({ message: "Check product quantities" });
    orderController.checkProductQuantities(req, res, next);
  }
);
router.post("/orders", (req, res, next: NextFunction) => {
   orderController.create(req, res, next);
});


router.put("/orders/:id/status",resolveIndexId ,(req, res, next: NextFunction) => {
  orderController.updateOrderStatus(req, res, next);
});




export default router;