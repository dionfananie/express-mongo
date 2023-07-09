import { Request, Response } from 'express';

import express from 'express';

const cors = require('cors');
const bodyParser = require('body-parser');

// import routes
const postRoutes = require('./routes/post');
const buyerRoutes = require('./routes/buyer');
const qurbanRoutes = require('./routes/qurban');
import corSetting from './utils/corsSetting';
import connectMongo from './utils/connectMongo';
import { PORT } from './constants';
require('dotenv/config');

const app = express();

app.use(cors(corSetting));
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

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to express mongo in dionfananie.my.id');
});

// connect to DB
connectMongo();

app.listen(process.env.PORT || PORT);
console.log(`running on PORT ${process.env.PORT || PORT}`);
