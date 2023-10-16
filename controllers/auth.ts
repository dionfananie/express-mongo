import type { Request, Response } from 'express';

import User from '../models/User';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) return res.json({ message: 'User already exist' });
    const newUser = await new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    const resp = await newUser.save();

    return res.json({ success: true, payload: { email: resp.email, name: resp.name } });
  } catch (error) {
    console.error(error);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    console.log('req.body.email: ', req.body);

    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ success: false, message: 'Authentication Failed. Invalid User Email or Password' });
    }
    const clientCookies = req?.cookies?.['auth-login'];

    const jwtToken = jwt.sign({ email: user.email, name: user.name, _id: user._id }, process.env.TOKEN_SECRET);
    if (!clientCookies) {
      res.cookie('auth-login', jwtToken, { maxAge: 3 * 24 * 60 * 60, httpOnly: true });
      console.log('cookie created successfully');
    }
    return res.json({ token: jwtToken, success: true, message: 'Success!' });
  } catch (error) {
    console.error(error);
  }
};

export const createCookies = async (_: Request, res: Response) => {
  try {
    const jwtToken = jwt.sign(
      { email: 'dion@edo.com', name: 'dionfananie', _id: '0987654321' },
      process.env.TOKEN_SECRET,
    );
    res.cookie('auth-login', jwtToken, { maxAge: 3 * 24 * 60 * 60, httpOnly: true, sameSite: 'none', secure: true });
    console.log('cookie created successfully');
    return res.json({ token: jwtToken, success: true, message: 'Success!' });
  } catch (error) {
    console.error(error);
  }
};
