
import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "@/util/validateRequest";
import ProductController from '../controller/product.controller';
import { Product } from '../entity/product.entity';
import { resolveIndexId } from "@/middleware";

const router = Router();
const productController = new ProductController();

// Routes
router.get("/products", productController.getAllDTO.bind(productController));
//shop
router.get("/shop/products", productController.getProducts.bind(productController));
// router.get("/products/", productController.getProducts.bind(productController));
router.get("/products/search", validateRequest, productController.findAndPaginate.bind(productController));
router.get("/products/:id",resolveIndexId, productController.getSingle.bind(productController));
router.get("/products/findByCategoryId/:id",resolveIndexId, productController.findByCategoryId.bind(productController));
router.post("/products", validateRequest, productController.createDTO.bind(productController));
router.put("/products/:id", validateRequest, productController.update.bind(productController));
router.delete("/products/:id", productController.delete.bind(productController));





export default router;
