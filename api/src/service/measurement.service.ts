// src/service/categoryProductService.ts
import { Measurement } from "@/entity/measurement.entity";
import BaseService from "./baseService";

export class MeasurementService extends BaseService<Measurement> {
  constructor() {
    super(Measurement);
  }

  // add custom...
}