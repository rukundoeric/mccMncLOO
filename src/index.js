import logger from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import api from './api/routes/index';

const app = express();
const port = process.env.PORT || 3456;

dotenv.config();
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(cors())
  .use('/api', api)
  .get('/', (_, res) => {
     res.status(200).send({
      status: 200,
      error: {
        message: 'Welcome!',
      }
    });
  })
  .use((_, res) => {
    res.status(404).send({
      status: 404,
      error: {
        message: 'Page Not found!',
      }
    });
  });

app.set('port', port);
app.use(logger('dev'));

app.listen(port, () => console.log(`App is listening on port ${port}`));
