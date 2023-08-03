const express = require('express');
const router = express.Router();
const synthesize = require('../helpers/synthesize');
const stream = require('stream')

router.post('/', async (req, res) => {
  const post = new Post({
    text: req.body.text,
  });
  const savePost = await post.save();
  res.json(savePost);
});

router.get('/', async (req, res) => {
  try {
    res.set({
      'Content-Type': 'audio/mpeg',
      'Transfer-Encoding': 'chunked',
    });
    const response = await synthesize();
    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(response.audioContent));
    bufferStream.pipe(res);
  } catch (error) {
    console.log('error: ', error);
    res.json({ message: error });
  }
});

module.exports = router;
