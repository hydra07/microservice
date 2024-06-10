import ImageUpload from "./image-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function UploadImgDialog() {
  return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow" variant="outline">
              File upload
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">
                Upload your files
              </DialogTitle>
              <DialogDescription className="text-center">
                The only file upload you will ever need
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* <ImageUpload /> */}
            </div>
          </DialogContent>
        </Dialog>
  );
}