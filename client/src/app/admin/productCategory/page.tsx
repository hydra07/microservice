'use client';
import { useEffect, useState } from 'react';
// import isAuth from "@/components/privateRouter";
import * as ProductCategoryService from '@/services/productCategory.service';
import { ProductCategoryType } from 'CustomTypes';
import { DataTable } from '../component/data-table';
// import UploadImgDialog from '../component/UploadImgDialog';
import { createColumns } from './columns';
import CreateProductCategoryDialog from './CreateProductCategoryDialog';
import dynamic from 'next/dynamic';
import { SkeletonTable } from '../component/SkeletonTable';
const ProductCategory = () => {
  const UploadImgDialog = dynamic(() => import('../component/UploadImgDialog'));
  // const DataTable = dynamic(() =>
  //   import('../component/data-table').then((mod) => mod.DataTable),
  // );
  const CreateProductCategoryDialog = dynamic(
    () => import('./CreateProductCategoryDialog'),
  );
  const BreadcrumbProduct = dynamic(() => import('../component/Breadcrumb'));
  const [data, setData] = useState<ProductCategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await ProductCategoryService.fetchProductCategories();
        //delay 2 seconds

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
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

  const skeletonColumns = [
    //first headre  not display

    { header: { width: 'w-[0px]' }, cell: { width: 'w-[10px]' } },
    { header: { width: 'w-3/5' }, cell: { width: 'w-3/5' } },
    { header: { width: 'w-1/5' }, cell: { width: 'w-1/5' } },
  ];

  if (loading) {
    return <SkeletonTable columns={skeletonColumns} rows={3} />;
  }
  return (
    <>
      <BreadcrumbProduct title="Product Category" />
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
