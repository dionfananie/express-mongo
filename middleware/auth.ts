import { NextFunction, Request, Response } from 'express';

const jwt = require('jsonwebtoken');

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
}

module.exports = auth;
