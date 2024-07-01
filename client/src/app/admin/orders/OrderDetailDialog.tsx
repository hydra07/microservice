"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderType } from "CustomTypes";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ViewOrderDialogProps {
  selectedOrder: OrderType;
}

const ViewOrderDialog: React.FC<ViewOrderDialogProps> = ({ selectedOrder }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          View Order Details
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            Order #{selectedOrder.id} -{" "}
            {new Date(selectedOrder.createAt).toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="customer-info" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer-info">Customer Info</TabsTrigger>
            <TabsTrigger value="order-items">Order Items</TabsTrigger>
          </TabsList>
          <TabsContent value="customer-info">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="space-y-4">
                <InfoItem label="Name" value={selectedOrder.name!} />
                <InfoItem label="Phone" value={selectedOrder.phone!} />
                <InfoItem label="Email" value={selectedOrder.email!} />
                <InfoItem
                  label="Shipping Address"
                  value={selectedOrder.shipAddress!}
                />
                <InfoItem label="Order Status" value={selectedOrder.status} />
                {/* <InfoItem label="Payment Status" value={selectedOrder.paymentStatus} /> */}
                <InfoItem
                  label="Total Amount"
                  value={`$${selectedOrder.total.toFixed(2)}`}
                />
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="order-items">
            <ScrollArea className="h-[300px] w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrder.orderItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("vi", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price)}
                      </TableCell>
                      <TableCell>{
                        new Intl.NumberFormat("vi", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price * item.quantity)
                      }</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end">
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex flex-col space-y-1">
    <span className="text-sm font-medium text-gray-500">{label}</span>
    <span className="text-base">{value}</span>
  </div>
);

export default ViewOrderDialog;
