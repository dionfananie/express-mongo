import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req: Request, res: Response) => {
  const id = req.query.id || 0;
  try {
    if (id) {
      const posts = await Post.findById(id);
      res.json(posts);
    } else {
      const posts = await Post.find();
      res.json(posts);
    }
  } catch (error) {
    console.error(error);
    res.json({ message: error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const post = new Post({
    title: req.body.title,
    desc: req.body.desc,
  });
  const savePost = await post.save();
  res.json(savePost);
});

export default router;
