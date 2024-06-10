
import { MeasurementService } from "@/service/measurement.service";
import { BaseController } from "./baseController";
import { Measurement } from "@/entity/measurement.entity";





export default class MeasurementController extends BaseController<Measurement> {
    constructor() {
      super(new MeasurementService());
    }
}