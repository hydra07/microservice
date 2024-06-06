'use client';
import dynamic from 'next/dynamic';

export default () => {
  const FormPost = dynamic(() => import('../components/Post'), { ssr: false });
  return (
    <div className="mx-10">
      <FormPost />
    </div>
  );
};
