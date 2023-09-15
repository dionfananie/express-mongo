import Post from '../models/Post';
import { Request, Response } from 'express';

export const getPosts = async (req: Request, res: Response) => {
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
    res.status(401).json({ message: error });
  }
};

export const insertPost = async (req: Request, res: Response) => {
  const post = new Post({
    title: req.body.title,
    desc: req.body.desc,
  });
  const savePost = await post.save();
  console.log('savePost: ', savePost);

  res.json(savePost);
};
