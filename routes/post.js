const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const verify = require('../middleware/auth');

router.get('/', verify, async (req, res) => {
  const id = req.query.id || 0;
  try {
    let posts = [];
    if (id) posts = await Post.findById(id);
    else posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    desc: req.body.desc,
  });
  const savePost = await post.save();
  res.json(savePost);
});

module.exports = router;
