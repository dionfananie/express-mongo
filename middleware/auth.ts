import { NextFunction, Request, Response } from 'express';

const jwt = require('jsonwebtoken');

export default function validateAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('Authorization');

    if (!token) return res.status(401).send({ success: false, message: 'Access Denied. No authorization!' });
    const tokenValue = token.split(' ')?.[1] || '';
    const verified = jwt.verify(tokenValue, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
}
