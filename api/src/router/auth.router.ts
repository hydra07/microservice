import AuthController from '@/controller/auth.controller';
import { authenticateJWT } from '@/middleware/authJwt';
import { Request, RequestWithUser, Response, Router } from 'express';
import passport from 'passport';
import env from '@/util/validateEnv';
const router = Router();
const authController = new AuthController();

// Function to construct the Discord authentication URL
const getDiscordAuthUrl = () => {
  const baseURL = 'https://discord.com/api/oauth2/authorize';
  const params = new URLSearchParams({
    client_id: env.DISCORD_CLIENT_ID || '',
    redirect_uri: env.DISCORD_CALLBACK_URL || '',
    response_type: 'code',
    scope: 'identify email',
  });

  return `${baseURL}?${params.toString()}`;
};

// Route to get the Discord authentication URL
router.get('/discord', (req: Request, res: Response) => {
  const authUrl = getDiscordAuthUrl();
  res.json({ authUrl });
});


// router.get('/discord', passport.authenticate('discord', { session: false }));
// router.get('/discord', (req: Request, res: Response) => {
//   console.log('Accessed protected route');
// });

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