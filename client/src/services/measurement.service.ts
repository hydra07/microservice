import { MeasurementType } from "CustomTypes";
import http from '@/lib/axios';
export const fetchMeasurements = async (): Promise<
    MeasurementType[]
> => {
    try {
        const res = await http.get("api/measurement");
        return res.data;
    } catch (err) {
        console.error("Error fetching measurements:", err);
        return [];
    }
}
export const createMeasurement = async (
    measurementData: MeasurementType
): Promise<MeasurementType | null> => {
    try {
        const res = await http.post("api/measurement", {
            name: measurementData.unit
    })
return res.data;
}catch (error) {
        console.error("Error creating measurement:", error);
        return null;
    }
} 

export const updateMeasurement = async (
    measurementData: MeasurementType
): Promise<MeasurementType | null> => {
    try {
        const res = await http.put(`api/measurement/${measurementData.id}`, {
            name: measurementData.unit
        })
        return res.data;
    } catch (error) {
        return null;
    }
}