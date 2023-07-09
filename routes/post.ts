import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
import Post from '../models/Post';

router.get('/', async (req: Request, res: Response) => {
  console.log('masuk');

  const id = req.query.id || 0;
  try {
    console.log('masuk');
    if (id) {
      const posts = await Post.findById(id);
      res.json(posts);
    } else {
      const posts = await Post.find();
      console.log('posts: ', posts);

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
