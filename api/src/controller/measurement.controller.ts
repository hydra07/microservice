
import { MeasurementService } from "@/service/measurement.service";
import { BaseController } from "./baseController";
import { Measurement } from "@/entity/measurement.entity";
import { NextFunction, Request, Response } from "express";





export default class MeasurementController extends BaseController<Measurement> {
    constructor() {
      super(new MeasurementService());
    }


    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const entity = req.body;
        const savedEntity = await this.service.save(entity);
        res.status(201).json(savedEntity);
      } catch (error) {
        next(error);
      }
    } 
}