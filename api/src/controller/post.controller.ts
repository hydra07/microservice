import { NextFunction, Request, Response } from 'express';
import PostService from '../service/post.service';

export default class PostController {
  private postService = new PostService();

  createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, author, content } = req.body;
      const savedPost = await this.postService.createPost(
        title,
        author,
        content,
      );
      res.status(201).json(savedPost);
    } catch (error) {
      // res.status(500).json({ message: 'Failed to create post', error });
      next(error);
    }
  };

  getAllPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allPosts = await this.postService.getAllPosts();
      res.status(200).json(allPosts);
    } catch (error) {
      // res.status(500).json({ message: 'Failed to fetch posts', error });
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
}
