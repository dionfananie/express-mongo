const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

async function synthesize() {
  const client = new textToSpeech.TextToSpeechClient();
  const text = 'This is a demonstration of the Google Cloud Text-to-Speech API';

  const request = {
    input: { text: text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };
  res.set({
    'Content-Type': 'audio/mpeg',
    'Transfer-Encoding': 'chunked',
  });

  const [response] = await client.synthesizeSpeech(request);

  const bufferStream = new PassThrough();
  bufferStream.end(Buffer.from(response.audioContent));
  bufferStream.pipe(res);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}
module.exports = synthesize;
