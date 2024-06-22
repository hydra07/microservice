declare module 'Post' {
  export interface PostType {
    _id: string;
    title: string;
    createdAt: string;
    image: string;
    isActivate: boolean;
    user: {
      id: string;
      username: string;
      avatar: string;
    };
    content?: string;
    tags?: { name: string }[];
  }
  export interface CommentType {
    _id: string;
    content: string;
    createdAt: string;
    left: number;
    right: number;
    user: {
      username: string;
      avatar: string;
    };
  }
}
