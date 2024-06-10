import CommentService from '@/service/comment.service';
import { NextFunction, Request, Response } from 'express';

export default class CommentController {
  private commentService = new CommentService();

  addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content, userId, postId, commentId } = req.body;
      const newComment = await this.commentService.newComment(
        content,
        userId,
        postId,
        commentId,
      );
      const comment = await this.commentService.addComment(newComment);
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  };

  getComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const comments = await this.commentService.getCommentsByPostId(postId);
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  };
}
