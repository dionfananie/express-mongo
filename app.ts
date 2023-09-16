import { Request, Response } from 'express';

import corSetting from './utils/corsSetting';

const bodyParser = require('body-parser');

// import routes
import postRoutes from './routes/post';
import buyerRoutes from './routes/buyer';
import qurbanRoutes from './routes/qurban';
import authRoutes from './routes/auth';

import { PORT } from './constants';

import express from 'express';
import connectMongo from './utils/connectMongo';

const app = express();

app.use(corSetting);

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

// connect to DB
connectMongo();

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to express mongo in dionfananie.my.id');
});
const activePort = PORT;

app.listen(activePort, () => {
  console.log(`Listening on port ${PORT}...`);
});
