import { Request, Response } from 'express';
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

    return res.json({ email: resp.email, name: resp.name });
  } catch (error) {
    console.error(error);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication Failed. Invalid User Email or Password' });
    }
    const jwtToken = jwt.sign({ email: user.email, name: user.name, _id: user._id }, process.env.TOKEN_SECRET);
    return res.json({ token: jwtToken });
  } catch (error) {
    console.error(error);
  }
};
