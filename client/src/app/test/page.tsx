'use client';
import { useTheme } from 'next-themes';
export default function Test() {
  const { setTheme } = useTheme();
  return (
    <div className="w-full h-full">
      <button
        className="self-center bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          setTheme('light');
        }}
      >
        Light
      </button>
      <button
        className="self-center bg-gray-800 text-white px-4 py-2 rounded-md"
        onClick={() => {
          setTheme('dark');
        }}
      >
        Dark
      </button>
    </div>
  );
}
