import PostController from '@/controller/post.controller';
import { Router } from 'express';

const router = Router();
const postController = new PostController();
router
  .get('/post', postController.getAllPost)
  .post('/post', postController.createPost);
router
  .get('/post/:id', postController.getPostById)
  .put('/post/:id', postController.updatePost);
router.delete('/post/:id', postController.deletePost);
router.post('/post/comment', postController.addComment);
export default router;
