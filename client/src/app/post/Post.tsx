import axios from 'axios';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../components/ui/breadcrumb';
interface PostProps {
  id: string;
  children?: React.ReactNode;
}
async function fetchingPost(id: string) {
  try {
    const res = await axios.get(`http://localhost:5000/api/post/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Post({ id, children }: PostProps) {
  const post = await fetchingPost(id);
  return (
    <>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Post</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/post/${id}`}>
                  {post.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="text-gray-600 mb-2 flex flex-col">
            <span>By User {post.userId}</span>
            <span>{post.createdAt}</span>
          </div>
          <p className="text-lg">{post.content}</p>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}
