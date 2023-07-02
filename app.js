const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv/config');
const bodyParser = require('body-parser');

// import routes
const postRoutes = require('./routes/post');
const buyerRoutes = require('./routes/buyer');
const qurbanRoutes = require('./routes/qurban');
const authRoutes = require('./routes/auth');
const connectMongo = require('./utils/connectMongo');
const port = 3001;
var whitelist = process.env.ALLOWED_ORIGIN;
var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    const originUrl = origin || whitelist;
    if (whitelist.indexOf(originUrl) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  }),
);
app.use('/post', postRoutes);
app.use('/qurban', qurbanRoutes);
app.use('/buyer', buyerRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to express mongo in dionfananie.my.id');
});

// connect to DB
connectMongo();

app.listen(process.env.PORT || port);
console.log(`running on port ${process.env.PORT || port}`);
