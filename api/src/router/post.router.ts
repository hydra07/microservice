import PostController from '@/controller/post.controller';
import upload from '@/util/upload';
import { Router } from 'express';

const router = Router();
const postController = new PostController();
router
  // .get('/post', postController.getListPost)
  .get('/post', postController.getPost)
  .post('/post', upload('post', 'image'), postController.createPost);
router.get('/post/all', postController.getAllPost);
router.get('/post/tag', postController.getUniqueTags);
router.get('/post/tag/:tag', postController.getPostByTag);
router
  .get('/post/:id', postController.getPostById)
  .put('/post/:id', postController.publicPost);
// .put('/post/:id', postController.updatePost);
router.delete('/post/:id', postController.deletePost);
router.post('/post/comment', postController.addComment);
router.post('/post/tag/:id', postController.addTags);
export default router;
