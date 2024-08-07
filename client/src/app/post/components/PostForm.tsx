"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import axios from "@/lib/axios";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";

// export function AddPost() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button>Add Post</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-6xl w-2/3 h-4/5">
//         <FormPost />
//       </DialogContent>
//     </Dialog>
//   );
// }
import Editor from "@/components/Editor";
import useUploadFile from "@/hooks/useUploadFile";
import { toast } from "react-toastify";

export default function FormPost({ user }: any): ReactNode {
  const { InputFile, filePath } = useUploadFile("post");
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      userId: "",
      image: filePath,
    },
  });
  const onsubmit = async (data: any) => {
    data.userId = user.id;
    console.log(data);
    const res = await axios.post("/api/post", data);
    // console.log(res.data);
    if (res.status === 201) {
      toast.success("Post successfully added");
      // form.reset();
    }
  };
  // const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });
  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-5 overflow-y-auto"
        onSubmit={form.handleSubmit(onsubmit)}
        encType="multipart/form-data"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Please enter your post title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <InputFile
                  onChange={(filePath: string) => {
                    field.onChange(filePath);
                  }}
                />
              </FormControl>
              <FormDescription>This is your post thumbnail.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                {/* <Textarea
                  {...field}
                  placeholder="content"
                  className="resize-y h-max-80 overflow-auto h-60"
                /> */}
                <div className="h-100">
                  <Editor value={field.value} onChange={field.onChange} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="pt-7"></div>
        <Separator />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
