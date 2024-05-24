import { Router } from 'express';
import PostController from '@/controller/post.controller';

const router = Router();
const postController = new PostController();
router.get('/post', postController.getAllPost);
router.post('/post', postController.createPost);
router.put('/post/:id', postController.updatePost);
router.delete('/post/:id', postController.deletePost);
export default router;
