import express from 'express';
import routes from './routes';
import "reflect-metadata";
import uploadConfig from './config/upload';

import './database';

const app = express();
app.use('/files', express.static(uploadConfig.directory));
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('👻 Server is running');
});
