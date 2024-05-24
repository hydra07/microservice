import AuthController from '@/controller/auth.controller';
import { authenticateJWT } from '@/middleware/authJwt';
import { Request, RequestWithUser, Response, Router } from 'express';
import passport from 'passport';

const router = Router();
const authController = new AuthController();

router.get('/discord', passport.authenticate('discord', { session: false }));

router.get(
  '/discord/redirect',
  passport.authenticate('discord', { session: false }),
  (req: Request, res: Response) => {
    authController.saveTokenToCookie(req as RequestWithUser, res);
  },
);

// Apply this middleware to protected routes
router.get('/protected', authenticateJWT, (req: Request, res: Response) => {
  console.log('Accessed protected route');
  res.json({ message: 'This is a protected route', user: req.user });
});

export default router;
