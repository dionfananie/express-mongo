const express = require('express');
const router = express.Router();
const synthesize = require('../helpers/synthesize');

router.post('/', async (req, res) => {
  const post = new Post({
    text: req.body.text,
  });
  const savePost = await post.save();
  res.json(savePost);
});

router.get('/', async (req, res) => {
  try {
    console.log('masukkkkAASDASD');
    await synthesize();
    res.send('Welcome to express mongo in render');
  } catch (error) {
    console.log('error: ', error);
    res.json({ message: error });
  }
});

module.exports = router;
