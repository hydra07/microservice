import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
export default function useUploadFile() {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filePath, setFilePath] = useState<string>('');
  const handleChange = async () => {
    const formData = new FormData(formRef.current!);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/uploads`, {
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
        }
      }, [filePath, onChange]);
      return (
        <>
          <form ref={formRef} encType="multipart/form-data">
            <Input type="file" name="image" ref={fileInputRef} />
          </form>
          <div>
            {filePath && (
              <div className="w-full h-fit mb-8 flex flex-col">
                <Image
                  className="rounded-md object-cover"
                  src={filePath}
                  alt="Uploaded File"
                  width={200}
                  height={150}
                />
                <p className="text-green-400 flex-nowrap">
                  File uploaded successfully!
                </p>
              </div>
            )}
          </div>
        </>
      );
    },
    [filePath],
  );

  return { InputFile, filePath };
}
