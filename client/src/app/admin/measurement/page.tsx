'use client';
import * as MeasurementService from '@/services/measurement.service';
import { useEffect, useState } from 'react';
import { MeasurementType } from 'CustomTypes';
import { DataTable } from '../component/data-table';
import UploadImgDialog from '../component/UploadImgDialog';
import { createColumns } from './column';
import CreateUnitDialog from './CreateUnitDialog';
import { SkeletonTable } from '../component/SkeletonTable';

const Page = () => {
    const [data, setData] = useState<MeasurementType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await MeasurementService.fetchMeasurements();
                // Delay 2 seconds

                await new Promise((resolve) => setTimeout(resolve, 2000));

                setData(fetchedData);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCreateSuccess = (newProduct: MeasurementType) => {
        setData((prevData) => [...prevData, newProduct]);
    };

    const handleUpdateSuccess = (updatedProduct: MeasurementType) => {
        // Update table data after successful update
        setData((prevData) =>
            prevData.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product,
            ),
        );
    };

    const columns = createColumns(handleUpdateSuccess);

    const skeletonColumns = [
        // First header not displayed

        { header: { width: 'w-[0px]' }, cell: { width: 'w-[10px]' } },
        { header: { width: 'w-3/5' }, cell: { width: 'w-3/5' } },
        { header: { width: 'w-1/5' }, cell: { width: 'w-1/5' } },
    ];

    if (loading) {
        return <SkeletonTable columns={skeletonColumns} rows={3} />;
    }

    return (
        <>
            <h1>Measurements</h1>
            <CreateUnitDialog onCreateSuccess={handleCreateSuccess} />
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} />
            </div>
            <UploadImgDialog />
        </>
    );
};

export default Page;