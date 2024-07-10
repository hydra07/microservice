import { DropzoneOptions } from "react-dropzone";
import { useEffect, useState } from "react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import Image from "next/image";
import axios from "@/lib/axios";

export default function useImagesUpload(type: string) {
  const [files, setFiles] = useState<File[] | null>([]);

  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 4,
    maxSize: 1 * 1024 * 1024,
  } satisfies DropzoneOptions;

  //
  // @ts-ignore
  useEffect(() => {
    const uploadFiles = async (data: any) => {
      const res = await axios.post(`/api/uploads/${type}`, data);
      console.log(res.data);
    };
    if (files) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      uploadFiles(formData);
    }
  }, [files]);

  const Dropzone = () => {
    return (
      <FileUploader
        value={files}
        onValueChange={setFiles}
        dropzoneOptions={dropzone}
      >
        <FileInput>
          <div className="flex items-center justify-center h-32 w-full border bg-background rounded-md">
            <p className="text-gray-400">Drop files here</p>
          </div>
        </FileInput>
        <FileUploaderContent className="flex items-center flex-row gap-2">
          {files?.map((file, i) => (
            <FileUploaderItem
              key={i}
              index={i}
              className="size-20 p-0 rounded-md overflow-hidden"
              aria-roledescription={`file ${i + 1} containing ${file.name}`}
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                height={80}
                width={80}
                className="size-20 p-0"
              />
            </FileUploaderItem>
          ))}
        </FileUploaderContent>
      </FileUploader>
    );
  };
  return {
    Dropzone,
    // files,
  };
}
