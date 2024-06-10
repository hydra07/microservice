import MeasurementController from "@/controller/measurement.controller";
import { query, validationResult } from "express-validator";
import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "@/util/validateRequest";

const router = Router();
const measurementController = new MeasurementController();

// Routes
router.get("/measurements", measurementController.getAll.bind(measurementController));


export default router;