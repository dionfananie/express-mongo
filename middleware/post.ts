import type { NextFunction, Request, Response } from 'express';
import { PostData } from '../validation/post';

export const validatePostType = () => (req: Request, res: Response, next: NextFunction) => {
  try {
    PostData.parse(req.body);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
