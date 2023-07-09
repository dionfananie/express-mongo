import type { AnyZodObject } from 'zod';
import type { NextFunction, Request, Response } from 'express';

export const validateQurbanType = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      query: req.query,
    });

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
