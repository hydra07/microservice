export interface CommentDto {
  _id: string;
  content: string;
  userId: string;
  createAt: string;
  left: number;
  right: number;
  parent: CommentDto;
}
export interface PostDto {
  _id: string;
  title: string;
  userId: string;
  createdAt: Date;
  content: string;
  comments: CommentDto[];
}
