import { Skeleton } from "@/components/ui/skeleton";

function ProductSkeleton() {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <Skeleton className="h-[400px] md:h-[600px] w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-10 w-1/4" />
          </div>
        </div>
      </div>
    );
  }

export default ProductSkeleton;