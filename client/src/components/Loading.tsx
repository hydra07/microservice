import { Spinner } from './ui/spinner';

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Spinner size="large" />
    </div>
  );
}
