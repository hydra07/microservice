import { Request, Response, NextFunction } from 'express';

export const resolveIndexId = (req: Request, res: Response, next: NextFunction) => {
  const parsedId = parseInt(req.params.id);

  if (isNaN(parsedId)) return res.sendStatus(400);

  next();
};

// Middleware to check for body in GET request
export const  checkForBodyInGetRequest=(req: Request, res: Response, next: NextFunction) =>{
  if (req.method === 'GET' && Object.keys(req.body).length > 0) {
    return res.status(405).json({ error: 'Sending a body with a GET request is not supported' });
  }
  next();
}


