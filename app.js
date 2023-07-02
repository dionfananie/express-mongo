const express = require('express');
const app = express();
require('dotenv/config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// import routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

app.use(bodyParser.json());
app.use('/post', postRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to express mongo in render');
});
// connect to DB

const mongoUrl = `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, { useNewUrlParser: true }, () => {
  console.log('connected to DB Mongo Atlas!');
});

app.listen(process.env.PORT || 3001);
