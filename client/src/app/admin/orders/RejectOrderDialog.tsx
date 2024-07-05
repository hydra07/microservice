"use client";
import React, { useState } from "react";
import * as OrderService from "@/services/order.service";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { OrderType } from "CustomTypes";
import { X } from "lucide-react";

interface RejectOrderDialogProps {
  selectedOrder: OrderType;
  onRejectSuccess: (updatedOrder: OrderType) => void;
}

const RejectOrderDialog: React.FC<RejectOrderDialogProps> = ({
  selectedOrder,
  onRejectSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleRejectOrder = async () => {
    try {
      const updatedOrder = await OrderService.updateOrderStatus(
        selectedOrder.id,
        "rejected",
        rejectionReason
      );
      onRejectSuccess(updatedOrder);
      setOpen(false);
    } catch (error) {
      console.error("Failed to reject order:", error);
      // You might want to show an error message to the user here
    }
  }


  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setRejectionReason(""); // Reset the rejection reason when closing the dialog
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            setOpen(true);
          }}
          className="text-red-500 hover:text-red-700 hover:bg-red-100 focus:bg-red-100 focus:text-red-700 font-bold"
        >
          <X className="mr-2 h-4 w-4" />
          <span>Reject</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Order</DialogTitle>
          <DialogDescription>
            Provide a reason for rejecting this order.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Enter rejection reason"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            className="hover:bg-red-600"
            onClick={handleRejectOrder}
          >
            Confirm
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectOrderDialog;
