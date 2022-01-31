const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res)=>{
  try {
      const posts = await Post.find();
      res.json(posts)
  } catch (error) {
      res.json({message: err})
      
  }

})

router.post('/', async (req, res)=>{
    const post = new Post({
        title: req.body.title,
        desc: req.body.desc
    })
    const savePost = await post.save();
    res.json(savePost);

})

module.exports = router;