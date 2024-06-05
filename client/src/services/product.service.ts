import { ProductType } from "CustomTypes";
import http from "./http";


export const fetchProducts = async () => {
  try {
    const res = await http.get("api/products");
    return res.data;
  } catch (error) {
    return [];
  }
}

export const createProduct = async ( productData: ProductType) => {
  return null;
};

