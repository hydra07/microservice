import PostController from '@/controller/post.controller';
import { Router } from 'express';
import upload from '@/util/upload';

const router = Router();
const postController = new PostController();
router
  .get('/post', postController.getListPost)
  .post('/post',upload('post','image'), postController.createPost);
router
  .get('/post/:id', postController.getPostById)
  .put('/post/:id', postController.updatePost);
router.delete('/post/:id', postController.deletePost);
router.post('/post/comment', postController.addComment);
export default router;
