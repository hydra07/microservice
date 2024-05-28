// import { NextFunction, Request, Response } from 'express';
// import CategoryProductService from '@/service/categoryProduct.service';

import { BaseController } from "@/baseController";
import { CategoryProduct } from "@/entity/categoryProduct.entity";
import { CategoryProductService } from "@/service/categoryProduct.service";

// export default class CategoryProductController {
//     private categoryProductService = new CategoryProductService();

//     createCategoryProduct = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const { name } = req.body;
//             const savedCategoryProduct = await this.categoryProductService.save(
//                 { name, isActive: true },
//             );
//             res.status(201).json({
//                 status: 'ok',
//                 message: 'CategoryProduct created',
//                 data: savedCategoryProduct,
//             });
//         } catch (error) {
//             next(error);
//         }
//     };

//     getAllCategoryProduct = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const allCategoryProducts = await this.categoryProductService.getAll();
//             res.status(200).json(allCategoryProducts);
//         } catch (error) {
//             next(error);
//         }
//     };

//     updateCategoryProduct = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const { name, isActive } = req.body;
//             const categoryId = req.params.id;
//             const updatedCategoryProduct = await this.categoryProductService.update(
//                 categoryId,
//                 { name, isActive },
//             );
//             res.status(200).json(updatedCategoryProduct);
//         } catch (error) {
//             next(error);
//         }
//     };
//     // disable categoryProduct
//     disableCategoryProduct = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const categoryId = req.params.id;
//             const disabledCategoryProduct = await this.categoryProductService.disable(
//                 categoryId,
//             );
//             res.status(200).json(disabledCategoryProduct);
//         } catch (error) {
//             next(error);
//         }
//     };
//     // enable categoryProduct
//     enableCategoryProduct = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const categoryId = req.params.id;
//             const enabledCategoryProduct = await this.categoryProductService.enable(
//                 categoryId,
//             );
//             res.status(200).json(enabledCategoryProduct);
//         } catch (error) {
//             next(error);
//         }
//     };

//     // find by keyword
//     findByKeyword = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const keyword = req.query.keyword as string;
//             const categoryProducts = await this.categoryProductService.findByKeyword(
//                 keyword,
//             );
//             res.status(200).json(categoryProducts);
//         } catch (error) {
//             next(error);
//         }
//     };


   
// }



export default class CategoryProductController extends BaseController<CategoryProduct> {
    constructor() {
      super(new CategoryProductService());
    }
}