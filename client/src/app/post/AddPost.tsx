'use client';
// import Editor from '@/components/Editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import useUploadFile from '@/hooks/useUploadFile';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

export function AddPost() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl w-2/3 h-4/5">
        <FormPost />
      </DialogContent>
    </Dialog>
  );
}

function FormPost() {
  // const [image, setImage] = useState<File | null>(null);
  const { InputFile, filePath } = useUploadFile();
  const form = useForm({
    defaultValues: {
      title: '',
      content: '',
      image: filePath,
    },
  });
  const onsubmit = async (data: any) => {
    data.userId = 'Day la userId nek';
    console.log(data);
    console.log(process.env.NEXT_PUBLIC_API_URL);
    const res = await axios.post('/api/post', data);
    console.log(res.data);
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-4 w-full h-full overflow-y-auto"
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
              <FormDescription>Please enter your post title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  // {...field}
                  onChange={(event) => {
                    if (event.target.files) {
                      field.onChange(event.target.files[0]);
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        /> */}
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

// function FormPost() {
//   return ()
// }
