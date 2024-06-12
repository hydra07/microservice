'use client';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';
import BreadcrumbTitle from '../component/Breadcrumb';
import { DataTable } from '../component/data-table';
import { createColumns } from './columns';
export default function Post() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await axios.get('/api/post/all');
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetching();
  }, []);
  return (
    <>
      <BreadcrumbTitle title="Post" />
      <PostTable data={data} />
    </>
  );
}

const PostTable = ({ data }: any) => {
  const columns = createColumns();
  return <DataTable columns={columns} data={data} />;
};
