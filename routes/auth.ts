import { Request, Response } from 'express';

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../Validation/user');

router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body || {};

  //   checking validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //   checking exsisting
  const emailExisted = await User.findOne({ email });
  if (emailExisted) return res.status(400).send('Email Already Exist');

  // Hash passwords
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(password, salt);

  try {
    const user = new User({
      name,
      email,
      password: hashedPass,
    });
    await user.save();
    res.send({ user: user._id, name, email });
  } catch (err) {
    const error = err as Error;
    res.json({ message: error.toString() });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};
    // validate user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ is_success: 0, text: error.details[0].message });

    // check email exist
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ is_success: 0, text: 'Invalid Email' });

    // checking password
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) return res.status(400).send({ is_success: 0, text: 'Invalid Password' });

    //   create and assign a token to header
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
    // res.header('auth-token', token).send(token);
    res.cookie('token', token, { httpOnly: true });

    res.send({ is_success: 1, text: 'Login Success!' });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
