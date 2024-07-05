// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/legacy/image";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   ArrowLeftIcon,
//   ArrowRightIcon,
//   MinusIcon,
//   PlusIcon,
// } from "lucide-react";
// import * as ProductService from "@/services/product.service";
// import { ProductType } from "CustomTypes";
// import Link from "@/components/Link";
// import { redirect } from "next/dist/server/api-utils";

// export default function ProductDetailPage({
//   params,
// }: {
//   params: { id: number };
// }) {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [currentRelatedIndex, setCurrentRelatedIndex] = useState(0);
//   const [product, setProduct] = useState<ProductType | null>(null);
//   const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
//   const router = useRouter();
//   const id = params.id;

//   const imgNotFound = process.env.NEXT_PUBLIC_IMG_NOTFOUND;

//   useEffect(() => {
//     if (!isNaN(id)) {
//       fetchProduct(id);
//     } else {
//       router.push("/404");
//     }
//   }, [id]);

//   const fetchProduct = async (productId: number) => {
//     try {
//       const data = await ProductService.getProductById(productId);
//       if (data) {
//         setProduct(data);
//         const relatedData = await ProductService.getProductByCategory(
//           data.category.id
//         );

//         if (relatedData) {
//           setRelatedProducts(relatedData.filter((p) => p.id !== data.id && p.quantity > 0));        }
//       } else {
//         router.push("/404");
//       }
//     } catch (error) {
//       router.push("/404");
//     }
//   };

//   // fetchProduct(5);

//   const handlePrevRelated = () => {
//     setCurrentRelatedIndex((prev) => Math.max(prev - 1, 0));
//   };

//   const handleNextRelated = () => {
//     setCurrentRelatedIndex((prev) =>
//       Math.min(prev + 1, relatedProducts.length - 4)
//     );
//   };

//   const handleQuantityChange = (value: number) => {
//     setQuantity((prev) => Math.max(1, Math.min(value, product?.quantity || 1)));
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="grid gap-8 md:grid-cols-2 items-start max-w-6xl mx-auto p-4 md:p-8">
//       {/* Product Images */}
//       <div className="grid gap-4">
//         <div className="overflow-hidden rounded-lg">
//           <Image
//             src={
//               product.imgProducts[selectedImage]?.imageUrl ||
//               (imgNotFound as string)
//             }
//             alt={product.name}
//             width={800}
//             height={800}
//             className="w-full h-[400px] md:h-[600px] object-cover"
//           />
//         </div>
//         <div className="flex gap-2 overflow-x-auto">
//           {product.imgProducts.map((image, index) => (
//             <button
//               key={index}
//               onClick={() => setSelectedImage(index)}
//               className={`shrink-0 w-[80px] h-[80px] rounded-md overflow-hidden border-2 transition-all ${
//                 index === selectedImage
//                   ? "border-primary"
//                   : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
//               }`}
//             >
//               <Image
//                 src={image.imageUrl || (imgNotFound as string)}
//                 alt={`Thumbnail ${index + 1}`}
//                 width={80}
//                 height={80}
//                 className="w-full h-full object-cover"
//               />
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Product Details */}
//       <div className="grid gap-6">
//         <div>
//           <h1 className="text-3xl font-bold">{product.name}</h1>
//           <p className="text-gray-500 dark:text-gray-400 mt-2">
//             {product.description}
//           </p>
//         </div>
//         <div className="grid gap-4">
//           <div className="flex items-center justify-between">
//             <div className="text-4xl font-bold">
//               ${product.price.toFixed(2)}
//             </div>
//             <div className="text-gray-500 dark:text-gray-400">
//               {product.quantity} in stock
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <Label htmlFor="quantity" className="text-base">
//               Quantity
//             </Label>
//             <div className="flex items-center gap-2">
//               <Button
//                 size="icon"
//                 variant="outline"
//                 onClick={() => handleQuantityChange(quantity - 1)}
//               >
//                 <MinusIcon className="w-4 h-4" />
//               </Button>
//               <Input
//                 id="quantity"
//                 type="number"
//                 value={quantity}
//                 onChange={(e) =>
//                   handleQuantityChange(parseInt(e.target.value, 10))
//                 }
//                 className="w-16 text-center"
//               />
//               <Button
//                 size="icon"
//                 variant="outline"
//                 onClick={() => handleQuantityChange(quantity + 1)}
//               >
//                 <PlusIcon className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>
//           <Button size="lg">Add to Cart</Button>
//         </div>
//       </div>

//       {/* Related Products */}
//       <div className="col-span-2">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-2xl font-bold">Related Products</h2>
//           <div className="flex items-center gap-2">
//             <Button
//               size="icon"
//               variant="outline"
//               onClick={handlePrevRelated}
//               disabled={currentRelatedIndex === 0}
//             >
//               <ArrowLeftIcon className="w-4 h-4" />
//             </Button>
//             <Button
//               size="icon"
//               variant="outline"
//               onClick={handleNextRelated}
//               disabled={currentRelatedIndex >= relatedProducts.length - 4}
//             >
//               <ArrowRightIcon className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {relatedProducts
//             .slice(currentRelatedIndex, currentRelatedIndex + 5)
//             .map((product) => (
//               <div
//                 key={product.id}
//                 className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-1"
//               >
//                 <Link
//                   href={`/product/${product.id}`}
//                   className="absolute inset-0 z-10"
//                   // prefetch={false}
//                 >
//                   <span className="sr-only">View</span>
//                 </Link>
//                 <Image
//                   src={
//                     product.imgProducts[0]?.imageUrl || (imgNotFound as string)
//                   }
//                   alt={product.name}
//                   width={300}
//                   height={240}
//                   className="object-cover w-full h-40"
//                 />
//                 <div className="p-3 bg-white dark:bg-gray-950">
//                   <h3 className="font-semibold text-base">{product.name}</h3>
//                   <p className="text-xs text-gray-500 line-clamp-1">
//                     {product.description}
//                   </p>
//                   <h4 className="font-bold text-sm">
//                     ${product.price.toFixed(2)}
//                   </h4>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }
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
// export const metadata: Metadata = {
//   title: "Product Details",
//   description: "View details of our amazing product",
// };

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
      <div className="container mx-auto px-8 py-6 bg-white dark:bg-slate-600">
        <Breadcrumb
          items={[
            { label: "Home", link: "/" },
            { label: "Product", link: "/product" },
            { label: product!.name },
          ]}
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 items-start">
          <div className="md:col-span-1 lg:col-span-1">
            <ProductImage product={product} />
          </div>
          <div className="md:col-span-1 lg:col-span-1">
            <div className="flex flex-col">
              <ProductDetails product={product} />
            </div>
            <div className="mt-16 px-6">
              <RelatedProducts products={relatedProducts} />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
