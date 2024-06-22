'use client';
import { useSearchParams } from 'next/navigation';
import ListPost from './components/ListPost';

export default function PostList() {
  const link = useSearchParams();
  const tag = link.get('tag') ?? null;
  // const page = parseInt*link.get('page') ?? 1;
  // const page = Number(link.get('page') !== 0 ? link.get('page') : 1) ?? 1;
  const page = Number(link.get('page') ?? 1);

  return <ListPost tag={tag} page={page !== 0 ? page : 1} />;
}
