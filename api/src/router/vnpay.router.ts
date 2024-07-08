import { NextFunction, Router } from "express";
import VnpayController from "@/controller/vnpay.controller";
import { resolveIndexId } from "@/middleware";


const router = Router();
const vnpayController = new VnpayController();
router.get('/vnpay_return', vnpayController.vnpayReturn.bind(vnpayController));
// router.get('/vnpay_ipn', vnpayIpn);
router.post('/create_payment_url', vnpayController.createPayment.bind(vnpayController));
router.post('/refund/',vnpayController.refund.bind(vnpayController));
export default router;