import CategoryProductController from "@/controller/categoryProduct.controller";
import { query, validationResult } from "express-validator";
import { CategoryProductSchema } from "@/validate-schema/CategoryProductSchema";
import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "@/util/validateRequest";

const router = Router();
const categoryProductController = new CategoryProductController();

// Routes
router.get("/categoryProduct", categoryProductController.getAll.bind(categoryProductController));
router.get("/categoryProduct/search", CategoryProductSchema, validateRequest, categoryProductController.findAndPaginate.bind(categoryProductController));
router.get("/categoryProduct/:id", categoryProductController.getSingle.bind(categoryProductController));

router.post("/categoryProduct", CategoryProductSchema, validateRequest, categoryProductController.create.bind(categoryProductController));
router.put("/categoryProduct/:id", CategoryProductSchema, validateRequest, categoryProductController.update.bind(categoryProductController));
router.delete("/categoryProduct/:id", categoryProductController.delete.bind(categoryProductController));


export default router;
