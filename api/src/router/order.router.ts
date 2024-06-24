import { Router } from "express";

const router = Router();

router.post("/orders", (req, res) => {
  console.log(req.body);
  res.json({ message: "Order created" });
});
  

export default router;