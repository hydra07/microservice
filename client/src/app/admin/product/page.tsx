'use client';

import * as ProductService from '@/services/product.service';
import { ProductType } from 'CustomTypes';
import { useEffect, useState } from 'react';
import { DataTable } from '../component/data-table';
import { createColumns } from './columns';
import CreateProductDialog from './CreateProductDialog';
import { SkeletonTable } from '../component/SkeletonTable';
import UpdateProductDialog from './UpdateProductDialog';  
import BreadcrumbProduct from '../component/Breadcrumb';
const Product = () => {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const BreadcrumbProduct = dynamic(() => import('../component/Breadcrumb'));
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await ProductService.getAllProducts();
        if(fetchedData) {
          setData(fetchedData);
        }
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

  const handleUpdateClick = (product: ProductType) => {
    setSelectedProduct(product);
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



  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <BreadcrumbProduct title="Product" />
      
      <CreateProductDialog onCreateSuccess={handleCreateSuccess} />
      <div className="container mx-auto py-10">        
        {loading ? (
          <SkeletonTable columns={skeletonColumns} rows={3} />
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>

      {/* <UpdateProductDialog onUpdateSuccess={handleUpdateSuccess} selectedProduct={selectedProduct} /> */}

    </>
  );
};
export default Product;
