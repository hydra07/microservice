"use client";
import React, { useState } from "react";
import * as MeasurementService from "@/services/measurement.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { MeasurementType } from "CustomTypes";
import { set } from "date-fns";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface UpdateUnitDialogProps {
    measurement: MeasurementType;
    onUpdateSuccess: (updatedMeasurement: MeasurementType) => void;
}
const UpdateUnitDialog: React.FC<
    UpdateUnitDialogProps>
= ({ measurement, onUpdateSuccess }) => {

    const [open, setOpen] = useState(false);
    const [updateUnit, setUpdatedUnit] = useState<MeasurementType>({
        ...measurement,
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setUpdatedUnit({ ...updateUnit, [e.target.name]: e.target.value });
    };

    const handleUpdateUnit = async () => {
        if (updateUnit) {
            try {
                const updatedUnitResult =
                    await MeasurementService.updateMeasurement(updateUnit);
                if (updatedUnitResult) {
                    onUpdateSuccess(updatedUnitResult);
                    setOpen(false);
                    setUpdatedUnit({ ...measurement });
                }
            } catch (error) {
                console.error("Failed to update unit:", error);
            }
        }
    };

    return (
        <>
            <DropdownMenuItem
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen(true);
                }}
            >
                Update
            </DropdownMenuItem>{" "}
            <Dialog open={open} onOpenChange={setOpen}>
                {/* <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => setOpenDialog(true)}
        >
          Update
        </Button>
      </DialogTrigger> */}
                <DialogContent className="sm:max-w-[425px] p-6">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold mb-2">
                            Update Unit
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 mb-4">
                            Update the unit  information.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label
                                htmlFor="name"
                                className="text-right col-span-1 font-semibold"
                            >
                                Unit
                            </label>
                            <Input
                                id="unit"
                                name="unit"
                                value={updateUnit.name}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>

                    </div>
                    <DialogFooter className="mt-6">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="mr-2"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdateUnit}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            Update
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UpdateUnitDialog;