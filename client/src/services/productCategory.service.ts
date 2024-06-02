import http from "./http";
import { ProductCategoryType } from "CustomTypes";

export const fetchProductCategories = async (): Promise<
  ProductCategoryType[]
> => {
  try {
    const res = await http.get("api/categoryProduct");
    return res.data;
  } catch (err) {
    console.error("Error fetching product categories:", err);
    return [];
  }
};

export const createProductCategory = async (
  categoryData: ProductCategoryType
): Promise<ProductCategoryType | null> => {
  try {
    const res = await http.post("api/categoryProduct", {
      name: categoryData.name,
      isActive: categoryData.isActive,
    });
    return res.data;
  } catch (error) {
    console.error("Error creating product category:", error);
    return null;
  }
};

export const updateProductCategory = async (
  categoryData: ProductCategoryType
): Promise<ProductCategoryType | null> => {
  try {
    const res = await http.put(`api/categoryProduct/${categoryData.id}`, {
      name: categoryData.name,
      isActive: categoryData.isActive,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};
