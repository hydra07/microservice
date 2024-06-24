import { MeasurementType } from "CustomTypes";
import http from '@/lib/axios';
export const fetchMeasurements = async (): Promise<
    MeasurementType[]
> => {
    try {
        const res = await http.get("api/measurements");
        return res.data;
    } catch (err) {
        console.error("Error fetching measurements:", err);
        return [];
    }
}
export const createMeasurement = async (
    measurementData: MeasurementType
): Promise<MeasurementType> => {
    try {
        const res = await http.post("api/measurements", {
            name: measurementData.name
    })
return res.data;
}catch (error) {
        console.error("Error creating measurement:", error);
        return {} as MeasurementType;
    }
} 

export const updateMeasurement = async (
    measurementData: MeasurementType
): Promise<MeasurementType | null> => {
    try {
        const res = await http.put(`api/measurements/${measurementData.id}`, {
            name: measurementData.name
        })
        return res.data;
    } catch (error) {
        return null;
    }
}