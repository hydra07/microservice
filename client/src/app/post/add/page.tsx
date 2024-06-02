'use client';
import Editor from '@/components/Editor';
import { Button } from '@/components/ui/button';
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
import { useForm } from 'react-hook-form';
function FormPost() {
  // const [image, setImage] = useState<File | null>(null);
  const form = useForm({
    defaultValues: {
      title: '',
      content: '',
      image: null,
    },
  });
  const onsubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-4 mr-3"
        onSubmit={form.handleSubmit(onsubmit)}
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
              <FormDescription>This is your post thumbnail.</FormDescription>
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
                <Editor value={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <Separator />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default () => {
  return (
    <div className="mx-10">
      <FormPost />
    </div>
  );
};
