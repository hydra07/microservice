import CommentService from '@/service/comment.service';
import PostService from '@/service/post.service';
import { NextFunction, Request, Response } from 'express';

export default class PostController {
  private postService = new PostService();
  private commentService = new CommentService();
  createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, userId, content, image } = req.body;
      const newPost = await this.postService.newPost(
        title,
        userId,
        content,
        image,
      );
      const savedPost = await this.postService.addPost(newPost);
      res.status(201).json({
        message: 'Post created successfully',
        post: {
          id: savedPost._id,
          title: savedPost.title,
          userId: savedPost.userId,
          image: savedPost.image,
          createdAt: savedPost.createdAt,
          content: savedPost.content,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  getAllPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allPosts = await this.postService.getAllPosts();
      res
        .status(200)
        // .json(allPosts.map((post) => this.postService.mapPostToDto(post)));
        .json(allPosts);
    } catch (error) {
      // res.status(500).json({ message: 'Failed to fetch posts', error });
      next(error);
    }
  };

  getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const post = await this.postService.getPostById(postId);
      console.log(post);
      res.status(200).json(post);
    } catch (error) {
      // res.status(500).json({ message: 'Failed to fetch post', error });
      next(error);
    }
  };

  updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, author, content } = req.body;
      const postId = req.params.id;
      const updatedPost = await this.postService.updatePost(
        postId,
        title,
        author,
        content,
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      // res.status(500).json({ message: 'Failed to update post', error });
      next(error);
    }
  };
  deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const deletedPost = await this.postService.deletePost(postId);
      res.status(200).json(deletedPost);
    } catch (error) {
      next(error);
    }
  };

  addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content, userId, postId, parentId } = req.body;
      const newComment = await this.commentService.newComment(
        content,
        userId,
        postId,
        parentId,
      );
      const comment = await this.commentService.addComment(newComment);
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  };
}
