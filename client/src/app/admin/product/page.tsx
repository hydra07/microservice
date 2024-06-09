'use client';
import * as ProductService from '@/services/product.service';
import { ProductType } from 'CustomTypes';
import { useEffect, useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { DataTable } from '../component/data-table';
import { createColumns } from './columns';
import CreateProductDialog from './CreateProductDialog';
import { SkeletonTable } from '../component/SkeletonTable';

const Product = () => {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await ProductService.fetchProducts();
        
        console.log(fetchedData);
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

  const handleUpdateSuccess = (updatedProduct: ProductType) => {
    setData((prevData) =>
      prevData.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
  };

  const handleCreateSuccess = (newProduct: ProductType) => {
    setData((prevData) => [...prevData, newProduct]);
  };

  const columns = createColumns(handleUpdateSuccess);

  const skeletonColumns = [
    { header: { width: 'w-[50px]' }, cell: { width: 'w-8 h-8 rounded-full' } },
    { header: { width: 'w-[50px]' }, cell: { width: 'w-[30px]' } },
    { header: { width: 'w-[50px]' }, cell: { width: 'w-12 h-12 rounded-md' } },
    { header: { width: 'w-[150px]' }, cell: { width: 'w-[120px]' } },
    { header: { width: 'w-[100px]' }, cell: { width: 'w-[60px]' } },
    { header: { width: 'w-[100px]' }, cell: { width: 'w-[80px]' } },
    { header: { width: 'w-[80px]' }, cell: { width: 'w-[60px]' } },
  ];

  if (loading) {
    return <SkeletonTable columns={skeletonColumns} rows={3} />;
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
      {/* <UploadImgDialog /> */}
    </>
  );
};
export default Product;
// export default isAuth(Product);
