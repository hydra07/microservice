import Image from "next/image";
import Link from "next/link";
import { ProductType } from "CustomTypes";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const imgNotFound = process.env.NEXT_PUBLIC_IMG_NOTFOUND as string;

export default function RelatedProducts({ products }: { products: ProductType[] }) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/3 lg:basis-1/4">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

function ProductCard({ product }: { product: ProductType }) {
  return (
    <Card>
      <CardHeader>
        <Image
          src={product.imgProducts[0]?.imageUrl || imgNotFound}
          alt={product.name}
          width={300}
          height={200}
          className="object-cover w-full h-40 rounded-t-lg"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="font-bold">${product.price.toFixed(2)}</span>
        <Link href={`/product/${product.id}`} className="text-blue-600 hover:underline">
          View
        </Link>
      </CardFooter>
    </Card>
  );
}