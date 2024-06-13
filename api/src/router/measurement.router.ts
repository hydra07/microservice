import MeasurementController from "@/controller/measurement.controller";
import { query, validationResult } from "express-validator";
import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "@/util/validateRequest";

const router = Router();
const measurementController = new MeasurementController();

router.get('/measurements', (req: Request, res: Response, next: NextFunction)=>{
    measurementController.getAll(req,res, next);
})
router.get('/measurements/search',validateRequest,(req: Request, res: Response, next: NextFunction)=>{
    measurementController.getSingle(req,res, next);
})
router.post('/measurements', validateRequest,(req: Request, res: Response, next: NextFunction)=>{
    measurementController.create(req,res, next);
})
export default router;