const express = require('express');
const app = express();
require('dotenv/config');
const bodyParser = require('body-parser');
// import routes
const soundRoutes = require('./routes/sound');

app.use(bodyParser.json());
app.use('/sound', soundRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to express mongo in render');
});

app.listen(process.env.PORT || 3001);
