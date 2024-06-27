import { NextFunction, Router } from "express";
import OrderController from "@/controller/order.controller";
import { Logger } from "@/util/logger";
import { plainToClass, plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { OrderType } from "@/dto/create-order-item.dto";

const orderController = new OrderController();

const router = Router();

router.get("/orders/userOrders", (req, res, next: NextFunction) => {
  orderController.findOrderByUserAndStatus(req, res, next);
});


router.post("/checkProductQuantities", (req, res, next: NextFunction) => {
  // res.send({ message: "Check product quantities" });
    orderController.checkProductQuantities(req, res, next);
  }
);
router.post("/orders", (req, res, next: NextFunction) => {
   orderController.create(req, res, next);
});

router.get("/test" ,  async (req, res, next) => {
  try {
    Logger.info("Creating order");
    const order = await transformAndValidateOrderData(orderDataFromDB);
    res.send(order);
  } catch (error) {
    Logger.error("Failed to create order", error);
    next(error);
  }
}
);

const orderDataFromDB = {
  "id": 2,
  "name": "nha chau",
  "total": 44,
  "status": "pending",
  "shipAddress": "quang nam, Phường Hòa Phát, Quận Cẩm Lệ",
  "phone": "1234567892",
  "email": "damcaichetluon03@gmail.com",
  "paymentMethod": "cod",
  "createdAt": "2024-06-25T04:01:23.824Z",
  "shipDate": null,
  "user": {
    "id": "101033468453537182850",
    "username": "Võ Xuân Thành",
    "email": "xuanthanha03@gmail.com",
    "bio": null,
    "address": null,
    "avatar": "https://lh3.googleusercontent.com/a/ACg8ocJ3iHe6NIiMC1yTVQiSWjdP9Of9juhWiB-Yoqp4RzKxZzdiggrj=s96-c",
    "refreshTokenId": "abd3e884-d736-4dac-987c-9b1f9925e29c",
    "role": "admin"
  },
  "orderItems": [
    {
      "id": 1,
      "quantity": 2,
      "subtotal": 44,
      "product": {
        "id": 7,
        "name": "blue fish",
        "description": "acss",
        "currentQuantity": 0,
        "price": 22,
        "is_activated": true,
        "amountToSell": 1,
        "averageWeight": 0,
        "imgProducts": [
          {
            "id": 8,
            "imageUrl": "https://res.cloudinary.com/djvlldzih/image/upload/v1718219123/letcook/uploads/images/product/zdnqgpkrteucjhlihnve.png",
            "publicId": "letcook/uploads/images/product/zdnqgpkrteucjhlihnve"
          }
        ],
        "category": {
          "id": 4,
          "name": "bct",
          "isActive": true
        },
        "measurement": {
          "id": 2,
          "unit": "mg"
        },
        "nutrition": {
          "id": 7,
          "calories": 0,
          "sugar": 0,
          "fat": 0,
          "sodium": 0,
          "carbs": 0,
          "fiber": 0
        }
      }
    }
  ]
};

async function transformAndValidateOrderData(data: any) {
  const order = plainToInstance(OrderType, data);
  await validateOrReject(order);
  return order;
}

  

export default router;