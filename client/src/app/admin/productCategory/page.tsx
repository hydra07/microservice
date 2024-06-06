'use client';
import { useEffect, useState } from 'react';
// import isAuth from "@/components/privateRouter";
import * as ProductCategoryService from '@/services/productCategory.service';
import { ProductCategoryType } from 'CustomTypes';
import { DataTable } from '../component/data-table';
import UploadImgDialog from '../component/UploadImgDialog';
import { createColumns } from './columns';
import CreateProductCategoryDialog from './CreateProductCategoryDialog';
const ProductCategory = () => {
  const [data, setData] = useState<ProductCategoryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData =
          await ProductCategoryService.fetchProductCategories();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching product categories:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateSuccess = (newCategory: ProductCategoryType) => {
    setData((prevData) => [...prevData, newCategory]);
  };

  const handleUpdateSuccess = (updatedCategory: ProductCategoryType) => {
    // Cập nhật dữ liệu bảng sau khi cập nhật thành công
    setData((prevData) =>
      prevData.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category,
      ),
    );
  };

  const columns = createColumns(handleUpdateSuccess);

  return (
    <>
      <h1>Product Category</h1>
      <CreateProductCategoryDialog onCreateSuccess={handleCreateSuccess} />
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>

      {/* <ImageUpload /> */}
      <UploadImgDialog />
    </>
  );
};
export default ProductCategory;
// export default isAuth(ProductCategory);
