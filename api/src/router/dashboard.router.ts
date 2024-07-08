import DashboardController from '@/controller/dashboard.controller';
import { Router } from 'express';

const dashboardController = new DashboardController();

const router = Router();

router.get('/dashboard/metrics', dashboardController.getMetricData.bind(dashboardController));
router.get('/dashboard/recipes', dashboardController.getRecipeData.bind(dashboardController));
router.get('/dashboard/orders', dashboardController.getOrderData.bind(dashboardController));
router.get('/dashboard/revenue', dashboardController.getRevenueData.bind(dashboardController));
router.get('/dashboard/top-products', dashboardController.getTopProductData.bind(dashboardController));
router.get('/dashboard/posts', dashboardController.getPostData.bind(dashboardController));

export default router;