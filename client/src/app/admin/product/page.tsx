"use client";
import { useEffect, useState } from "react";
import isAuth from "@/components/privateRouter";
import { createColumns } from "./columns";
import { DataTable } from "../component/data-table";
import { ProductType } from "CustomTypes";
import CreateProductDialog from "./CreateProductDialog";
import UploadImgDialog from "../component/UploadImgDialog";
import * as ProductService from "@/services/product.service";

const Product = () => {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await ProductService.fetchProducts();
        console.log(fetchedData);
        // setData(fetchedData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateSuccess = (updatedProduct: ProductType) => {
    setData((prevData) =>
      prevData.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleCreateSuccess = (newProduct: ProductType) => {
    setData((prevData) => [...prevData, newProduct]);
  };

  const columns = createColumns(handleUpdateSuccess);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1>Product</h1>
      <CreateProductDialog onCreateSuccess={handleCreateSuccess} />
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
      <UploadImgDialog />
    </>
  );
};

export default isAuth(Product);
