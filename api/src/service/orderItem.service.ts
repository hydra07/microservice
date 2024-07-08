import { OrderItem } from "@/entity/orderItem.entity";
import BaseService from "./baseService";
import { DeepPartial } from "typeorm";

export class OrderIemService extends BaseService<OrderItem> {

  constructor() {
    super(OrderItem);
  }

  save(entity: DeepPartial<OrderItem>): Promise<OrderItem | undefined> {
    return super.save(entity);
  }
  async getBestSellingProducts(): Promise<{ name: string; sales: number }[]> {
    const productSales = await this.repository
        .createQueryBuilder("orderItem")
        .leftJoinAndSelect("orderItem.product", "product")
        .select("product.name", "name")
        .addSelect("SUM(orderItem.quantity)", "sales")
        .groupBy("product.id")
        .addGroupBy("product.name")
        .orderBy("sales", "DESC")
        .limit(5)
        .getRawMany();

    return productSales.map((ps) => ({
        name: ps.name,
        sales: parseInt(ps.sales, 10),
    }));
}
}