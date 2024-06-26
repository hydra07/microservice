"use client";
import React, { useState, useEffect } from "react";
import { ProductType, ProductCategoryType } from "CustomTypes";
import * as ProductService from "@/services/product.service";
import * as ProductCategoryService from "@/services/productCategory.service";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "../../store/useCartStore";
import Cart from "@/components/cart/Cart";
import Search from "./component/Search";
import SortFilterPanel from "./component/SortFilterPanel";
import PaginationComponent from "./component/Pagination";
import ProductItem from "./component/ProductItem";
import useDebounce from "@/hooks/useDebounce";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Breadcrumb } from "./component/Breadcrumb";
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
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const STOCK_EXCEEDED_ERROR = "Quantity exceeds available stock!";

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

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await ProductCategoryService.fetchProductCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // Set loading to true at the start of the fetch operation
      const sortOrder =
        sortBy === "low" ? "ASC" : sortBy === "high" ? "DESC" : "ASC";
      const orderBy = "price";
      try {
        const data = await ProductService.fetchProducts({
          page,
          limit,
          keyword: debouncedSearchTerm,
          category: selectedCategories.join(","),
          order: sortOrder,
          orderBy,
          fieldName: "name",
        });
        setProducts(data.data);
        setTotalPages(Math.ceil(data.total / limit));
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Optionally handle the error, e.g., by setting an error state
      } finally {
        setIsLoading(false); // Set loading to false once the fetch operation is complete
      }
    };
    fetchProducts();
  }, [page, limit, debouncedSearchTerm, selectedCategories, sortBy]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setPage(1);
  };

  const handleCategoryFilter = (categoryId: number) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(categoryId)
        ? prevSelectedCategories.filter((id) => id !== categoryId)
        : [...prevSelectedCategories, categoryId]
    );
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setSearchTerm("");
    } else if (searchTerm !== "" || !value.startsWith(" ")) {
      setSearchTerm(value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb
        items={[
          { label: "Home", link: "/" },
          { label: "Product", link: "/product" },
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 py-8">
        <div className="md:col-span-1">
          <SortFilterPanel
            sortBy={sortBy}
            selectedCategories={selectedCategories}
            categories={categories}
            onSortChange={handleSortChange}
            onCategoryFilter={handleCategoryFilter}
          />
        </div>
        <div className="col-span-1">
          <Search
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            isLoading={isLoading}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                imgNotFoundUrl={imgNotFoundUrl as string}
              />
            ))}
          </div>
          <div className="mt-6">
            <PaginationComponent
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <Cart />
      <ToastContainer {...toastConfig} />
    </div>
  );
  
  

}
