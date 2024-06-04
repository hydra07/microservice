import CategoryProductController from "@/controller/categoryProduct.controller";
import { query, validationResult } from "express-validator";
import { CategoryProductSchema } from "@/validate-schema";
import { NextFunction, Request, Response, Router } from "express";
const router = Router();
const categoryProductController = new CategoryProductController();

// router.get("/categoryProduct", categoryProductController.getAll.bind(categoryProductController));
router.get('/categoryProduct', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  try {
    const result = await categoryProductController.paginate(req, res);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching paginated data' });
  }
});
router.get("/categoryProduct/search", CategoryProductSchema, categoryProductController.findAndPaginate.bind(categoryProductController));
router.get("/categoryProduct/:id", categoryProductController.getSingle.bind(categoryProductController));
router.post("/categoryProduct", CategoryProductSchema, async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await categoryProductController.create(req, res);
});
router.put("/categoryProduct/:id", CategoryProductSchema, async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await categoryProductController.update(req, res);
});

// router.get("/categoryProduct/search", categoryProductController.findAndPaginate.bind(categoryProductController));
// router.get("/categoryProduct/cc", (req: Request,res: Response)=>{
//   return res.json({message: "cc"});
//   // console.log(req.query.page);
//   // console.log(req.query.limit);
//   // console.log(req.query.keyword);
//   // console.log(req.query.fieldName);
//   // categoryProductController.findAndPaginate(req,res);
// });


// router
//   .route("/categoryProduct")
//   .get(categoryProductController.getAll.bind(categoryProductController))
//   .post(
//     CategoryProductSchema,
//     async (req: Request, res: Response, next: NextFunction) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       await categoryProductController.create(req, res);
//     }
//   )
//   .put((req: Request, res: Response) => {
//     res
//       .status(405)
//       .json({ error: "PUT method not allowed on /categoryProduct" });
//   })
//   .delete((req: Request, res: Response) => {
//     res
//       .status(405)
//       .json({ error: "DELETE method not allowed on /categoryProduct" });
//   });

// router
//   .route("/categoryProduct/:id")
//   .get(categoryProductController.getSingle.bind(categoryProductController))
//   .put(
//     CategoryProductSchema,
//     async (req: Request, res: Response, next: NextFunction) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       await categoryProductController.update(req, res);
//     }
//   )
//   .post((req: Request, res: Response) => {
//     res
//       .status(405)
//       .json({ error: "POST method not allowed on /categoryProduct/:id" });
//   });
// router.route("/categoryProduct/search").get(
//   async (req: Request, res: Response, next: NextFunction) => {
//     console.log("search");
//     await categoryProductController.findAndPaginate(req, res);
//     console.log("after search");
//   }
// );
// router.get("/categoryProduct/paginate", CategoryProductSchema, (req: Request, res: Response) => {
//   console.log("paginate");
//   console.log(req.query.page);
//   console.log(req.query.limit);
//   console.log(req.query.keyword);
//   console.log(req.query.fieldName);

// });
// // router.delete("/categoryProduct/:id", categoryProductController.disableCategoryProduct.bind(categoryProductController));
// router.put("/categoryProduct/disable/:id",resolveIndexId ,categoryProductController.disableCategoryProduct.bind(categoryProductController));

// router.put("/categoryProduct/enable/:id",resolveIndexId,categoryProductController.enableCategoryProduct.bind(categoryProductController));

export default router;
