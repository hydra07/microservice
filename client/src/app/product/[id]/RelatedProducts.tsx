import Image from "next/image";
import Link from "next/link";
import { ProductType } from "CustomTypes";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const imgNotFoundUrl = process.env.NEXT_PUBLIC_IMG_NOTFOUND as string;

export default function RelatedProducts({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Related Products</h2>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <Card className="h-full">
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.imgProducts?.[0]?.imageUrl ?? imgNotFoundUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="p-3">
                  <h3
                    className="text-sm font-medium truncate"
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                  {/* <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {product.description}
                  </p> */}
                </CardContent>
                <CardFooter className="p-3 pt-0 flex justify-between items-center">
                  <span className="text-sm font-semibold">
                    {new Intl.NumberFormat("vi", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price)}
                  </span>
                  <Link
                    href={`/product/${product.id}`}
                    className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                  >
                    View
                  </Link>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
