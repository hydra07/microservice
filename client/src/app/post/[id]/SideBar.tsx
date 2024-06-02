import { Separator } from '@/components/ui/separator';
import axios from '@/lib/axios';

async function fetching() {
  const res = await axios.get(`/api/post/`);
  if (res.data) return res.data;
  return [];
}

export default async function SideBar() {
  const post = await fetching();
  return (
    <div className="w-72">
      <div className="sticky top-20 ">
        <Separator orientation="vertical" />
        <div className="bg-card rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
          <div>
            {post.map((post: any) => (
              <div key={post.id} className="mb-4">
                <a href={`/post/${post._id}`} className="text-primary">
                  {post.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
