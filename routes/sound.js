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
    // const client = new textToSpeech.TextToSpeechClient();
    // const text = 'This is a demonstration of the Google Cloud Text-to-Speech API';
  
    // const request = {
    //   input: { text: text },
    //   voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    //   audioConfig: { audioEncoding: 'MP3' },
    // };
   
  
    // const [response] = await client.synthesizeSpeech(request);
  
    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(response.audioContent));
    bufferStream.pipe(res);
  } catch (error) {
    console.log('error: ', error);
    res.json({ message: error });
  }
});

module.exports = router;
