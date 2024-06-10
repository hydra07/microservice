
import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "@/util/validateRequest";
import ProductController from '../controller/product.controller';
import { Product } from '../entity/product.entity';

const router = Router();
const productController = new ProductController();

// Routes
router.get("/products", productController.getAll.bind(productController));
router.get("/products/search", validateRequest, productController.findAndPaginate.bind(productController));
router.get("/products/:id", productController.getSingle.bind(productController));

router.post("/products", validateRequest, productController.create.bind(productController));
router.put("/products/:id", validateRequest, productController.update.bind(productController));
router.delete("/products/:id", productController.delete.bind(productController));


export default router;
