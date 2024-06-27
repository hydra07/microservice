import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";
import { FileImage, UploadCloud, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImgProductType, ProductType } from "CustomTypes";

interface ProductImageUploadProps {
  newProduct: ProductType;
  onUploadSuccess: (uploadedFilesData: ImgProductType[]) => void;
}

interface FileUploadProgress {
  progress: number;
  file: File;
  source: CancelTokenSource | null;
  preview?: string;
  imageId?: number; // Optional property
}

// eslint-disable-next-line react/display-name
const UpdateImage = forwardRef<
  { handleUpload: () => Promise<ImgProductType[]> },
  ProductImageUploadProps
>(({ newProduct, onUploadSuccess }, ref) => {
  const [existingImages, setExistingImages] = useState<ImgProductType[]>(
    newProduct.imgProducts || []
  );
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
  const [filesToDeletes, setFilesToDeletes] = useState<ImgProductType[]>([]);

  console.log("existing file", existingImages);
  console.log("files to upload", filesToUpload);

  const removeExistingImage = (index: number) => {
    if (existingImages[index].id) {
      setFilesToDeletes((prevDeletes) => [
        ...prevDeletes,
        existingImages[index],
      ]);
    }
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const replaceExistingImage = (index: number, file: File, id: number) => {
    const newUrl = URL.createObjectURL(file);
    setExistingImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = { ...newImages[index], imageUrl: newUrl };
      return newImages;
    });

    // Remove the file to upload based on the imageId
    setFilesToUpload((prev) => prev.filter((item) => item.imageId !== id));

    // Add the new file to upload
    setFilesToUpload((prev) => [
      ...prev,
      { file, progress: 0, source: null, preview: newUrl, imageId: id },
    ]);
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

    if (progress === 100) {
      setFilesToUpload((prevUploadProgress) => {
        return prevUploadProgress.filter((item) => item.file !== file);
      });
    }
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
      return prevUploadProgress.filter((item) => item.file !== file);
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
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useImperativeHandle(ref, () => ({
    handleUpload: async () => {
      const uploadedImages = await Promise.all(
        filesToUpload.map(({ file, imageId }) => {
          const formData = new FormData();
          formData.append("files", file);
          formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_UPLOAD_PRESET as string
          );
          if (imageId) {
            formData.append("imageId", imageId.toString());
          }
          return uploadImageToBackend(
            formData,
            () => {},
            axios.CancelToken.source()
          );
        })
      );

      //delete img
      if (filesToDeletes.length > 0) {
        await Promise.all(
          filesToDeletes.map((file) => {
            return axios.delete(
              `http://localhost:3000/api/uploadImg/${file.id}`
            );
          })
        );
      }

      const uploadedFilesData = uploadedImages.map((response) => ({
        imageUrl: response.data[0].imageUrl,
        publicId: response.data[0].publicId,
        id: response.data[0].id, // Include imageId in the response handling
      }));

      onUploadSuccess(uploadedFilesData);
      return uploadedFilesData;
    },
  }));

  return (
    <div>
      <div
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
            Click to upload files &#40;files should be under 10 MB &#41;
          </p>
        </div>
      </div>

      <Input
        {...getInputProps()}
        accept="image/png, image/jpeg"
        type="file"
        className="hidden"
      />

      {existingImages.length > 0 && (
        <div>
          <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
            Existing Images
          </p>
          <div className="grid grid-cols-3 gap-4">
            {existingImages.map((image, index) => (
              <div key={image.publicId} className="relative group">
                <img
                  src={image.imageUrl}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => removeExistingImage(index)}
                    className="bg-red-500 text-white p-2 rounded-full mr-2"
                  >
                    <X size={20} />
                  </button>
                  <label className="bg-blue-500 text-white p-2 rounded-full cursor-pointer">
                    <UploadCloud size={20} />
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          replaceExistingImage(
                            index,
                            e.target.files[0],
                            image.id!
                          );
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filesToUpload.length > 0 && (
        <div>
          <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
            Files to upload
          </p>
          <div className="space-y-2 pr-3">
            {filesToUpload.map((fileUploadProgress) => (
              <div
                key={fileUploadProgress.file.lastModified}
                className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
              >
                <div className="flex items-center flex-1 p-2">
                  <div className="text-white">
                    <img
                      src={fileUploadProgress.preview}
                      alt={fileUploadProgress.file.name}
                      className="w-10 h-10 object-cover"
                    />
                  </div>
                  <div className="w-full ml-2 space-y-1">
                    <div className="text-sm flex justify-between">
                      <p className="text-muted-foreground ">
                        {fileUploadProgress.file.name.slice(0, 25)}
                      </p>
                      <span className="text-xs">
                        {fileUploadProgress.progress}%
                      </span>
                    </div>
                    <Progress
                      value={fileUploadProgress.progress}
                      className="bg-purple-600"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (fileUploadProgress.source)
                      fileUploadProgress.source.cancel("Upload cancelled");
                    removeFile(fileUploadProgress.file);
                  }}
                  className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default UpdateImage;
