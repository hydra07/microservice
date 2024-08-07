import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PostType } from 'Post';

// interface Post {
//   id: number;
//   title: string;
//   content: string;
//   category?: string;
// }

interface PostsProps {
  posts: PostType[];

}

const MyPosts: React.FC<PostsProps> = ({ posts}) => {
  const handleEditPost = (post: PostType) => {
    const updatedTitle = prompt("Edit post title:", post.title);
    const updatedContent = prompt("Edit post content:", post.content);

    // if (updatedTitle !== null && updatedContent !== null) {
    //   onEdit(post._id, { ...post, title: updatedTitle, content: updatedContent });
    // }
  };

  return (
    <div className="py-6 md:py-8 h-[550px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {posts.map((post) => (
          <Card key={post._id} className="aspect-[16/9] overflow-hidden">
            <CardContent className="flex flex-col h-full bg-gradient-to-t from-muted/80 to-transparent p-5">
              <h3 className="text-lg font-bold text-foreground">{post.title}</h3>
              <h3 className="text-sm text-foreground">{post.content}</h3>
              <div className="self-end mt-auto">
                <Button variant="ghost" size="sm" onClick={() => handleEditPost(post)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm"
                //  onClick={() => onDelete(post._id)}
                 >
                  Delete
                </Button>
              </div>
            </CardContent>
            <img
              src="/image-not-found.png"
              alt="Post thumbnail"
              width={400}
              height={300}
              className="object-cover w-full h-full"
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;