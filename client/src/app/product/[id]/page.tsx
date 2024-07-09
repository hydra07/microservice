"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import * as ProductService from "@/services/product.service";
import { ProductType } from "CustomTypes";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import RelatedProducts from "./RelatedProducts";
import ErrorBoundary from "../component/ErrorBoundary";
import { Metadata } from "next";
import { metadata as layoutMetadata } from "../../layout";
import { Breadcrumb } from "../../../components/Breadcrumb";
import ProductSkeleton from "../component/ProductSkeleton";
import { delay } from "framer-motion";
import ProductComment from "../component/ProductComment/ProductComment";
import Cart from "@/components/cart/Cart";
import { ToastContainer } from "react-toastify";
// export const metadata: Metadata = {
//   title: "Product Details",
//   description: "View details of our amazing product",
// };

const toastConfig = {
  position: "top-right" as const,
  autoClose: 1000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light" as const,
};

export default function ProductDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProductData = async () => {
      if (isNaN(params.id)) {
        router.push("/404");
        return;
      }

      try {
        const productData = await ProductService.getProductById(params.id);
        if (!productData) {
          router.push("/404");
          return;
        }

        setProduct(productData);
        const relatedData = await ProductService.getProductByCategory(
          productData.category.id
        );
        if (relatedData) {
          const filteredRelatedProducts = relatedData.filter(
            (product) =>
              product.currentQuantity > 0 && product.id !== productData.id
          );
          setRelatedProducts(filteredRelatedProducts);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        router.push("/error");
      }
    };

    fetchProductData();
  }, [params.id, router]);

  const filteredRelatedProducts = useMemo(
    () => relatedProducts.filter((p) => p.id !== product?.id && p.quantity > 0),
    [relatedProducts, product]
  );

  if (!product) {
    return <ProductSkeleton />;
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-800">
        <Breadcrumb
          items={[
            { label: "Home", link: "/" },
            { label: "Product", link: "/product" },
            { label: product!.name },
          ]}
        />
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-2 items-start">
          <div className="md:col-span-1 lg:col-span-1  p-6">
            <div className="mb-6">
              <ProductImage product={product} />
            </div>
            <div className="mt-8 px-4 bg-white dark:bg-gray-700 rounded-md shadow-md p-6">
              <RelatedProducts products={relatedProducts} />
            </div>
          </div>
          <div className="md:col-span-1 lg:col-span-1 bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 min-h-[100vh]">
            <ProductDetails product={product} />
            <ProductComment productId={params.id} />
          </div>
        </div>
        <Cart />
        <ToastContainer {...toastConfig} />
      </div>
    </ErrorBoundary>
  );
}
