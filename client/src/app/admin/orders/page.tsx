"use client"
  
import { OrderType } from "CustomTypes";
import { useEffect, useState } from "react";
import * as OrderService from "@/services/order.service";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SkeletonTable } from "../component/SkeletonTable";
import { DataTable } from "../component/data-table";
import { createColumns } from "./columns";

const Order = () => {
  const [data, setData] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await OrderService.fetchOrders();
        if (fetchedData) {
          setData(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateSuccess = (updatedOrder: OrderType) => {
    setData((prevData) =>
      prevData.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  }

  const columns = createColumns(handleUpdateSuccess);


  const skeletonColumns = [
    { header: { width: "w-[50px]" }, cell: { width: "w-8 h-8 rounded-full" } },
    { header: { width: "w-[50px]" }, cell: { width: "w-[30px]" } },
    { header: { width: "w-[50px]" }, cell: { width: "w-12 h-12 rounded-md" } },
    { header: { width: "w-[150px]" }, cell: { width: "w-[120px]" } },
    { header: { width: "w-[100px]" }, cell: { width: "w-[60px]" } },
    { header: { width: "w-[100px]" }, cell: { width: "w-[80px]" } },
  ];

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", link: "/" },
          { label: "Admin", link: "/admin" },
          { label: "Order", link: "/order" },
        ]}
      />

      {/* <CreateProductDialog onCreateSuccess={handleCreateSuccess} /> */}
      <div className="container mx-auto py-10">
        {loading ? (
          <SkeletonTable columns={skeletonColumns} rows={3} />
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </>
  );
};


export default Order;