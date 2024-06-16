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
      const tag = req.query.tag;
      let post;
      if (tag) {
        post = await this.postService.getAllPostByTag(tag as string);
      } else {
        post = await this.postService.getPostWithUser();
      }
      res
        .status(200)
        // .json(allPosts.map((post) => this.postService.mapPostToDto(post)));
        .json(post);
    } catch (error) {
      // res.status(500).json({ message: 'Failed to fetch posts', error });
      next(error);
    }
  };
  getPostByTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const tag = req.query.tag as string;
      const tag = req.params.tag as string;
      console.log(tag);

      const posts = await this.postService.getAllPostByTag(tag);
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  };
  // getListPost = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const listPosts = await this.postService.getListPost();
  //     res.status(200).json(listPosts);
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const post = await this.postService.getPostById(postId);
      // console.log(post);
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

  publicPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id as string;
      const isActivate = req.query.isActivate as string;
      console.log(isActivate);
      if (isActivate !== undefined) {
        // Chuyển đổi giá trị của isActivate thành boolean
        const isActive = isActivate.toLowerCase() === 'true';
        await this.postService.publicPost(postId, isActive);
      } else {
        // Nếu không có isActivate thì thực hiện hành động private post
        await this.postService.publicPost(postId, false);
      }
      const post = await this.postService.getPostById(postId);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  };
  addTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const tags = req.body.tags;
      const post = await this.postService.addTagToPost(postId, tags);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  };
  getUniqueTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tags = await this.postService.getAllUniqueTags();
      res.status(200).json(tags);
    } catch (error) {
      next(error);
    }
  };
}
