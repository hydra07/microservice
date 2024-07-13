import React, { useCallback, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useDropzone } from "react-dropzone";
import { Trash2 as RemoveIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface UploadImageProps {
  type: string;
  onChange: (urls: string[]) => void; //this is a functions to get all urls of images if them are uploaded
  options?: any;
}

const UploadImage = ({ type, onChange, options }: UploadImageProps) => {
  const [files, setFiles] = useState<File[] | []>([]);
  const [message, setMessage] = useState<string>("");
  const [urls, setUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      setIsUploading(true);
      setMessage("");

      const formData = new FormData();
      acceptedFiles.forEach((file: any) => {
        formData.append("files", file);
      });

      try {
        const response = await axios.post(`/api/uploads/${type}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // const newUrls = response.data.filePaths.map(
        //   (filePath: string) =>
        //     `${process.env.NEXT_PUBLIC_API_URL}/${filePath}`,
        // );
        const newUrls = response.data.filePaths;
        setUrls((prevUrls) => [...prevUrls, ...newUrls]);
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        setMessage("Files đã được cập nhật thành công!");
      } catch (error) {
        setMessage("Có lỗi xảy ra khi cập nhật files.");
        console.error("Lỗi:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [type],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
  });

  const removeImage = (index: number) => {
    setUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onChange(urls);
    return () => {
      onChange([]);
    };
  }, [urls]);
  return (
    <div
      className={cn(
        "flex ",
        options?.horizontal ? "flex-row space-x-2" : "flex-col space-y-2 ",
      )}
    >
      <div className={"flex flex-col space-y-3"}>
        <div
          {...getRootProps()}
          className={cn(
            "border-2 rounded-lg p-5 text-center cursor-pointer",
            "w-full max-w-lg min-w-[300px] h-48",
            "flex flex-col items-center justify-center",
            // "mx-auto",
            "transition-colors duration-300",
            {
              "border-green-500": isDragActive,
              "border-gray-300 hover:border-gray-400": !isDragActive,
            },
          )}
        >
          <input {...getInputProps()} />
          <svg
            className={cn(
              "w-12 h-12 mb-4",
              isDragActive ? "text-green-500" : "text-gray-400",
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          {isDragActive ? (
            <p className="text-green-600">Thả các file ảnh vào đây ...</p>
          ) : (
            <p className="text-gray-500">
              Kéo và thả các file ảnh vào đây, hoặc click để chọn files
            </p>
          )}
        </div>
        {isUploading && <Spinner size="large" />}
        {message && <p>{message}</p>}
      </div>
      <div
        className={cn(
          "grid gap-2.5 w-full max-w-lg min-w-[300px]",
          options?.horizontal
            ? "grid-cols-3 auto-cols-fr h-60"
            : "grid-cols-5 auto-rows-fr h-28",
        )}
      >
        {urls.map((url, index) => (
          <div key={index} className="relative w-full h-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${url}`}
              alt={`file-${index}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 22vw"
              className="object-cover rounded"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 duration-200 ease-in-out"
            >
              <RemoveIcon className="w-4 h-4 hover:stroke-destructive duration-200 ease-in-out" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const imageStyles = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "4px",
};

export default UploadImage;
