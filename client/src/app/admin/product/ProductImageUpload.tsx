"use client";

import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";
import {
  AudioWaveform,
  File,
  FileImage,
  FolderArchive,
  UploadCloud,
  Video,
  X,
} from "lucide-react";
import React, { useCallback, useState, forwardRef, useImperativeHandle } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ProductType } from "CustomTypes";

interface FileUploadProgress {
  progress: number;
  file: File;
  source: CancelTokenSource | null;
  preview: string;
}

interface ImageUploadProps {
  newProduct: ProductType;
  onUploadSuccess: (uploadedFilesData: { imageUrl: string; publicId: string }[]) => void;
}

interface ProductImageUploadHandle {
  handleUpload: () => void;
  // getFilesToUpload: () => FileUploadProgress[];
}

enum FileTypes {
  Image = "image",
  Pdf = "pdf",
  Audio = "audio",
  Video = "video",
  Other = "other",
}

const ImageColor = {
  bgColor: "bg-purple-600",
  fillColor: "fill-purple-600",
};

const PdfColor = {
  bgColor: "bg-blue-400",
  fillColor: "fill-blue-400",
};

const AudioColor = {
  bgColor: "bg-yellow-400",
  fillColor: "fill-yellow-400",
};

const VideoColor = {
  bgColor: "bg-green-400",
  fillColor: "fill-green-400",
};

const OtherColor = {
  bgColor: "bg-gray-400",
  fillColor: "fill-gray-400",
};

const ProductImageUpload = forwardRef<ProductImageUploadHandle, ImageUploadProps>(
  ({ newProduct, onUploadSuccess }, ref) => {
    const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
    const [uploadedImages, setUploadedImages] = useState<{ imageUrl: string; publicId: string }[]>([]);

    useImperativeHandle(ref, () => ({
      async handleUpload() {
        const uploadedImagesData = await handleUpload();
        return uploadedImagesData;
      }
    }));

    const getFileIconAndColor = (file: File) => {
      if (file.type.includes(FileTypes.Image)) {
        return {
          icon: <FileImage size={40} className={ImageColor.fillColor} />,
          color: ImageColor.bgColor,
        };
      }

      if (file.type.includes(FileTypes.Pdf)) {
        return {
          icon: <File size={40} className={PdfColor.fillColor} />,
          color: PdfColor.bgColor,
        };
      }

      if (file.type.includes(FileTypes.Audio)) {
        return {
          icon: <AudioWaveform size={40} className={AudioColor.fillColor} />,
          color: AudioColor.bgColor,
        };
      }

      if (file.type.includes(FileTypes.Video)) {
        return {
          icon: <Video size={40} className={VideoColor.fillColor} />,
          color: VideoColor.bgColor,
        };
      }

      return {
        icon: <FolderArchive size={40} className={OtherColor.fillColor} />,
        color: OtherColor.bgColor,
      };
    };

    const onUploadProgress = (
      progressEvent: AxiosProgressEvent,
      file: File,
      cancelSource: CancelTokenSource
    ) => {
      const progress = Math.round(
        (progressEvent.loaded / (progressEvent.total ?? 0)) * 100
      );

      setFilesToUpload((prevUploadProgress) =>
        prevUploadProgress.map((item) =>
          item.file.name === file.name
            ? { ...item, progress, source: cancelSource }
            : item
        )
      );
    };

    const uploadImageToBackend = async (
      formData: FormData,
      onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
      cancelSource: CancelTokenSource
    ) => {

      return axios.post(`http://localhost:3000/api/uploadImg`, formData, {
        onUploadProgress,
        cancelToken: cancelSource.token,
      });
    };

    const removeFile = (file: File) => {
      setFilesToUpload((prevUploadProgress) => {
        const updatedFiles = prevUploadProgress.filter(
          (item) => item.file !== file
        );
        updatedFiles.forEach((item) => URL.revokeObjectURL(item.preview));
        return updatedFiles;
      });
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
      const filesProgress = acceptedFiles.map((file) => ({
        progress: 0,
        file: file,
        source: null,
        preview: URL.createObjectURL(file),
      }));

      
      setFilesToUpload((prevUploadProgress) => [
        ...prevUploadProgress,
        ...filesProgress,
      ]);

      
    }, [onUploadProgress]);

    const handleUpload = async () => {
      console.log(filesToUpload);
      const fileUploadPromises = filesToUpload.map((fileUpload) => {
        const formData = new FormData();
        formData.append("files", fileUpload.file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_UPLOAD_PRESET as string
        );

        const cancelSource = axios.CancelToken.source();

        return uploadImageToBackend(
          formData,
          (progressEvent) =>
            onUploadProgress(progressEvent, fileUpload.file, cancelSource),
          cancelSource
        );
      });
      
      

      try {
        const responses = await Promise.all(fileUploadPromises);
        // console.log(responses, 'in upload');
        const uploadedFilesData = responses.map((response) => ({
          imageUrl: response.data[0].imageUrl,
          publicId: response.data[0].publicId,
        }));

        // newProduct.imgProducts = uploadedFilesData
        // console.log(newProduct, 'in upload');
        // console.log(uploadedFilesData, 'in upload');
        console.log(uploadedFilesData , 'in upload');
        onUploadSuccess(uploadedFilesData);
  
        // return uploadedFilesData; // Return the uploaded files data

      } catch (error) {
        console.error("Error uploading files: ", error);
        throw error; // Ensure to throw the error to handle it in the caller

      }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="text-center">
            <div className="border p-2 rounded-md max-w-min mx-auto">
              <UploadCloud size={20} />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Drag files</span>
            </p>
            <p className="text-xs text-gray-500">
              Click to upload files &#40;files should be under 10 MB&#41;
            </p>
          </div>
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
        />
      </div>

      {filesToUpload.length > 0 && (
        <div>
          <ScrollArea className="h-40">
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
              Files to upload
            </p>
            <div className="space-y-2 pr-3">
              {filesToUpload.map((fileUpload) => (
                <div
                  key={fileUpload.file.lastModified}
                  className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
                >
                  <div className="flex items-center flex-1 p-2">
                    {fileUpload.file.type.includes(FileTypes.Image) ? (
                      <img src={fileUpload.preview} alt={fileUpload.file.name} className="w-10 h-10 object-cover" />
                    ) : (
                      <div className="text-white">
                        {getFileIconAndColor(fileUpload.file).icon}
                      </div>
                    )}

                    <div className="w-full ml-2 space-y-1">
                      <div className="text-sm flex justify-between">
                        <p className="text-muted-foreground">
                          {fileUpload.file.name.slice(0, 25)}
                        </p>
                        <span className="text-xs">
                          {fileUpload.progress}%
                        </span>
                      </div>
                      <Progress
                        value={fileUpload.progress}
                        className={
                          getFileIconAndColor(fileUpload.file).color
                        }
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (fileUpload.source)
                        fileUpload.source.cancel("Upload cancelled");
                      removeFile(fileUpload.file);
                    }}
                    className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* <Button onClick={handleUpload} className="mt-4">
            Upload Files
          </Button> */}
        </div>
      )}
    </div>
  );
})

export default ProductImageUpload;