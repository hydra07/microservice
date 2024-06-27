import { Request, Response, NextFunction } from 'express';

export const resolveIndexId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).send({ error: "Invalid ID syntax. ID must be an integer." });
  }
  next();
};

// Middleware to check for body in GET request
export const  checkForBodyInGetRequest=(req: Request, res: Response, next: NextFunction) =>{
  if (req.method === 'GET' && Object.keys(req.body).length > 0) {
    return res.status(405).json({ error: 'Sending a body with a GET request is not supported' });
  }
  next();
}


