import { useTheme } from '@/components/theme-provider';
import { FormEvent, useState } from 'react';
export default function Test() {
  const { setTheme } = useTheme();
  const [image, setImage] = useState<string | null>(null);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch('http://localhost:3000/api/uploads', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log(data.filePath);
    setImage(`http://localhost:3000/${data.filePath}`);

    // handle response
  };
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

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="image" required />
        <button type="submit">Upload</button>
      </form>

      {/* <img src="http://localhost:3000/upload/1716263063699.png" alt="image" /> */}
      {image && <img src={image} alt="image" />}
    </div>
  );
}
