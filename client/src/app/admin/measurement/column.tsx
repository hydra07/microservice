"use client";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { MeasurementType } from "CustomTypes";
import UpdateMeasurementTypeDialog from "./UpdateUnitDialog";

export const createColumns = (handleUpdateSuccess: (updatedMeasurementType: MeasurementType) => void): ColumnDef<MeasurementType>[] => [
    {
        id: "actions",
        cell: ({ row }) => {
            const measurementType = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(measurementType.id.toString())}
                        >
                            Copy measurement ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <UpdateMeasurementTypeDialog
                            measurement={measurementType}
                            onUpdateSuccess={handleUpdateSuccess}
                        />
                        <DropdownMenuItem>View measurement details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },

    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        maxSize: 20,
        enableResizing: false,
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => {
            const isActive = row.getValue("isActive");

            return (
                <div className="flex items-center">
                    <div
                        className={`h-2 w-2 rounded-full mr-2 ${isActive ? "bg-green-500" : "bg-red-500"
                            }`}
                    />
                    {isActive ? "Active" : "Inactive"}
                </div>
            );
        },
    },
    // {
    //   accessorKey: "amount",
    //   header: () => <div className="text-right">Amount</div>,
    //   cell: ({ row }) => {
    //     const amount = parseFloat(row.getValue("amount"))
    //     const formatted = new Intl.NumberFormat("en-US", {
    //       style: "currency",
    //       currency: "USD",
    //     }).format(amount)

    //     return <div className="text-right font-medium">{formatted}</div>
    //   },
    // },
];

