import CommentController from '@/controller/comment.controller';
import { Router } from 'express';

const router = Router();
const commentController = new CommentController();

router.post('/comment', commentController.addComment);
router.get('/comment/:id', commentController.getComment);
export default router;
