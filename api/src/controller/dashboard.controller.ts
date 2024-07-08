import { OrderService } from "@/service/order.service";
import ProductService from "@/service/product.service";
import UserService from "@/service/user.service";
import PostService from "@/service/post.service";
import { NextFunction, Request, Response } from "express";
import {formatMonthName, getMonthRange} from '@/util/date';
// import RecipeService from "@/service/recipe.service";

export default class DashboardController {
  private productService: ProductService;
  private userService: UserService;
  private orderService: OrderService;
  private postService: PostService;
//   private recipeService: RecipeService;
  constructor() {
    this.postService = new PostService();
    this.productService = new ProductService();
    this.userService = new UserService();
    // this.recipeService = new RecipeService();
    this.orderService = new OrderService(this.userService, this.productService);
  }

  /* 
    TODO   
    const metrics = {
    recipesToCheck: 15,
    postsToCheck: 8,
    pendingOrders: 23,
    userCount: 1250,
    income: {
        current: 52000,
        previous: 48000,
    },
    };
*/

  async getMetricData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // const recipesToCheck = await this.recipeService.getRecipesToCheck();
      const recipesToCheck = 2;
      const postsToCheck = await this.postService.countPostsToCheck();
      const pendingOrders = await this.orderService.countOrdersToCheck();
      const userCount = await this.userService.countUsers();
      const income = await this.orderService.countOrdersForLastTwoWeeks();

      res.status(200).json({
        recipesToCheck,
        postsToCheck,
        pendingOrders,
        userCount,
        income,
      });
    } catch (error) {}
  }

  /*

  TODO
  const data = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
];
*/

  async getRevenueData(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.orderService.getRevenueByMonth();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  /* 
    TODO   
    const data = [
  { month: 'Jan', orders: 120 },
  { month: 'Feb', orders: 140 },
  { month: 'Mar', orders: 160 },
  { month: 'Apr', orders: 180 },
  { month: 'May', orders: 200 },
];
*/
  async getOrderData(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.orderService.countOrdersByMonth();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  /*
  TODO
  const data = [
  { month: 'Jan',  recipes: 120 },
  { month: 'Feb',  recipes: 140 },
  { month: 'Mar',  recipes: 160 },
  { month: 'Apr',  recipes: 180 },
  { month: 'May',  recipes: 200 },
];
  const data = [
  { month: 'Jan', recipes: 120 },
  { month: 'Feb',  recipes: 140 },
  { month: 'Mar',  recipes: 160 },
  { month: 'Apr',  recipes: 180 },
  { month: 'May',  recipes: 200 },
];
*/

  async getPostData(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await this.postService.countPostsByMonth();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
  }

  async getRecipeData(req: Request, res: Response, next: NextFunction) {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const recipeCounts = [2,2,2,2,2];
    
       
        const data = recipeCounts.map((count, index) => ({
          month: formatMonthName(currentDate.getMonth() - 4 + index),
          recipes: count,
        }));
    
        res.status(200).json(data);
      } catch (error) {
        next(error);
      }
  }

  async getTopProductData(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.productService.getBestSellingProducts();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
