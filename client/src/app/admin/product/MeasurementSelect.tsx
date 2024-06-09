// CategorySelect.tsx
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MeasurementType } from "CustomTypes";

interface MeasurementSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const MeasurementSelect: React.FC<MeasurementSelectProps> = ({ value, onChange }) => {
  const [measurements, setMeasurements] = useState<MeasurementType[]>([]);

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/measurements");
        const data = await response.json();
        // console.log(data);
        setMeasurements(data);
      } catch (error) {
        console.error("Error fetching measuremtnws:", error);
      }
    };

    fetchMeasurements();
  }, []);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a measurement" />
      </SelectTrigger>
      <SelectContent>
        {measurements.map((measurement) => (
          <SelectItem key={measurement.id} value={measurement.id.toString()}>
            {measurement.unit}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MeasurementSelect;