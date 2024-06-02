import { Input } from '@/components/ui/input';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function useUploadFile() {
  // const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filePath, setFilePath] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const handleChange = async () => {
    const formData = new FormData(formRef.current!);
    // const res = await axios.post('/api/uploads', formData);
    // const data = await res.data;
    const res = await fetch('http://localhost:3000/api/uploads', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    setFilePath(`${process.env.NEXT_PUBLIC_API_URL}/${data.filePath}`);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    const handleFileChange = () => {
      if (fileInputRef.current && fileInputRef.current.files?.length) {
        handleChange();
      }
    };

    const input = fileInputRef.current;
    if (input) {
      input.addEventListener('change', handleFileChange);
    }

    return () => {
      if (input) {
        input.removeEventListener('change', handleFileChange);
      }
    };
  });

  const InputFile = useCallback(
    ({ onChange }: { onChange: (filePath: string) => void }) => {
      useEffect(() => {
        if (filePath) {
          onChange(filePath);
          // setCount((prev) => prev + 1);
        }
      }, [filePath, onChange]);
      return (
        <>
          <form ref={formRef} encType="multipart/form-data">
            <Input type="file" name="image" ref={fileInputRef} />
          </form>
          {filePath && (
            <div>
              <p>File uploaded successfully!</p>
              <img src={filePath} alt="Uploaded File" />
            </div>
          )}
        </>
      );
    },
    [filePath],
  );

  return { InputFile, filePath };
}
