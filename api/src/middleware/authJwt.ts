import { NextFunction, Request, RequestWithUser, Response } from 'express';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
//env
import { UserRole } from '@/@types/user.d';
import env from '@/util/validateEnv';

const { TokenExpiredError } = jwt;

const catchError = (res: Response, error: JsonWebTokenError) => {
  if (error instanceof TokenExpiredError) {
    return res.status(401).json({ message: 'Unauthorized: Token expired' });
  } else {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
// verìfy token
const verifyToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['x-access-token'] as string;

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    if (decoded && typeof decoded === 'object') {
      req.user = { id: decoded.id, role: decoded.role };

      next();
    } else {
      return res.status(401).send({ message: 'Invalid token!' });
    }
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return catchError(res, err);
    } else {
      return res.status(500).send({ message: 'Internal server error!' });
    }
  }
};

// check role
const isValidRole = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const role = req.user.role;
  if (role === UserRole.ADMIN || role === UserRole.USER) {
    next();
  } else {
    res.status(403).send({ message: 'Invalid Role!' });
  }
};

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log('Authenticating JWT');
  const token = req.cookies.accessToken;

  console.log('Token:', token);
  if (!token) {
    return res.status(401).json({ message: 'Access token not found' });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
      role: string;
    };
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return catchError(res, error);
    } else {
      return res.status(500).send({ message: 'Internal server error!' });
    }
  }
};

export { authenticateJWT, isValidRole, verifyToken };
