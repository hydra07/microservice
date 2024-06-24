import { useEffect, useState } from "react";
import * as MeasurementService from "@/services/measurement.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
    DialogClose,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from "@/components/ui/dialog";
import { MeasurementType } from "CustomTypes";
import { set } from "date-fns";
import { object } from "zod";

interface CreateUnitDialogProps {
    onCreateSuccess: (newUnit: MeasurementType) => void;
}

const CreateUnitDialog: React.FC<CreateUnitDialogProps> = ({ onCreateSuccess }) => {
    const [open, setOpen] = useState(false);
    const [newUnit, setNewUnit] = useState<MeasurementType>({
        id: 0,
        name: "",
        isActive: true
    });
    const [error, setError] = useState('');
    const [exist, setExist] = useState<MeasurementType[]>([]);
    
    useEffect(()=>{
        const fetchExist = async () => {
            const units= await MeasurementService.fetchMeasurements();
            setExist(units);
        
        };
        fetchExist();
    }, [])
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        if(name === 'name' && exist.some((unit) => unit.name === value)) {
            setError('Name must be unique');
            return;
        }
        setError('');
        setNewUnit({ ...newUnit, [e.target.name]: e.target.value });
    };

    const handleCreateUnit = async () => {
        try {
            if(error || exist.some((unit) => unit.name === newUnit.name)) {
                setError('Name must be unique');
                return;
            }
            const createdUnit = await MeasurementService.createMeasurement(newUnit);
            if (createdUnit) {
                onCreateSuccess(createdUnit);
                setOpen(false);
                setNewUnit({ id: 0, name: "" , isActive: true});
            }
        } catch (error) {
            console.error("Error creating measurement unit:", error);
        }
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-green-500 hover:bg-green-600 text-white">
                    Create Unit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold mb-2">Create Measurement Unit</DialogTitle>
                    <DialogDescription className="text-gray-500 mb-4">
                        Create a new measurement unit.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="unit" className="text-right col-span-1 font-semibold">
                            Unit
                        </label>
                        <Input
                            id="unit"
                            name="name"
                            value={newUnit.name}
                            onChange={handleInputChange}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="isActive" className="text-right col-span-1 font-semibold">
                        Active
                    </label>
                    <Input
                        id="isActive"
                        name="isActive"
                        type="checkbox"
                        checked={newUnit.isActive}
                        onChange={(e) =>
                            setNewUnit({ ...newUnit, isActive: e.target.checked })
                        }
                        className="col-span-3"
                    />
                </div>
                <DialogFooter className="mt-6">
                    <Button variant="outline" onClick={() => setOpen(false)} className="mr-2">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateUnit} className="bg-green-500 hover:bg-green-600 text-white">
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateUnitDialog;

