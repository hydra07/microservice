This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```typescript
"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { SearchIcon } from "lucide-react";
import { ProductCategoryType, ProductType } from "CustomTypes";
import * as ProductService from "@/services/product.service";
import * as ProductCategoryService from "@/services/productCategory.service";
import dynamic from "next/dynamic";

export default function Component() {
  const [sortBy, setSortBy] = useState<string>("featured");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(5);
  const imgNotFoundUrl = process.env.NEXT_PUBLIC_IMG_NOTFOUND;
  const [categories, setCategories] = useState<ProductCategoryType[]>([]);
  const DynamicLink = dynamic(() => import("@/components/Link"));

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await ProductCategoryService.fetchProductCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await ProductService.fetchProducts(page, limit);
      setProducts(data.data);
      setTotalPages(Math.ceil(data.total / limit));
    };
    fetchProducts();
  }, [page, limit]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilter = (categoryId: number) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(categoryId)
        ? prevSelectedCategories.filter((id) => id !== categoryId)
        : [...prevSelectedCategories, categoryId]
    );
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const filteredProducts = useMemo(() => {
    const searchFiltered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filtered = searchFiltered.filter((product) =>
      selectedCategories.length === 0
        ? true
        : selectedCategories.includes(product.category.id)
    );

    switch (sortBy) {
      case "low":
        return filtered.sort((a, b) => a.price - b.price);
      case "high":
        return filtered.sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  }, [products, selectedCategories, sortBy, searchTerm]);

  return (
    <div className="w-full">
      <header className="bg-gray-100 dark:bg-gray-800 py-4 px-6">
        <div className="container mx-auto flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <Input
              onChange={handleSearchChange}
              value={searchTerm}
              type="text"
              placeholder="Search product..."
              className="w-full rounded-md bg-white px-10 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-950 dark:text-gray-50"
            />
          </div>
        </div>
      </header>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 py-8">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Sort By
          </h3>
          <div className="space-y-2">
            <RadioGroup value={sortBy} onValueChange={handleSortChange}>
              <Label className="flex items-center gap-2 font-normal">
                <RadioGroupItem
                  value="featured"
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Featured
                </span>
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <RadioGroupItem
                  value="low"
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Price: Low to High
                </span>
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <RadioGroupItem
                  value="high"
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Price: High to Low
                </span>
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <RadioGroupItem
                  value="newest"
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Newest</span>
              </Label>
            </RadioGroup>
          </div>
          <h3 className="text-lg font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-200">
            Filter By
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <Label
                key={category.id}
                className="flex items-center gap-2 font-normal"
              >
                <Checkbox
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryFilter(category.id)}
                  className="text-indigo-600 focus"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
              </Label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800"
            >
              <DynamicLink href={`/product/${product.id}`} className="block">
                <img
                  src={product.imgProducts?.[0]?.imageUrl ?? imgNotFoundUrl}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                    {product.description.length > 20
                      ? product.description.substring(0, 20) + "..."
                      : product.description}
                  </p>
                  <div className="mt-4 font-medium text-primary-500">
                    ${product.price.toFixed(2)}
                  </div>
                  <button className="mt-4 w-full bg-green-300 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </DynamicLink>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 py-6">
        <div className="container mx-auto">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={index + 1 === page}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

```
