import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';

import upload from '@config/upload';
import { dataSource } from '@shared/database/typeorm/dataSource';
import { router } from '@shared/infra/http/routes';

import 'dotenv/config';
import '@shared/container';

import swaggerFile from '../../../doc/swagger.json';
import { appErrorResponse } from './middlewares/appErrorResponse';

const app = express();

dataSource
  .initialize()
  .then(() => {
    console.log('💥️ Database initialized');
    app.use(express.json());

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

    app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
    app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

    app.use(router);

    app.use(appErrorResponse);

    app.listen(3333, () => console.log('😈️ Server is running!'));
  })
  .catch(err => {
    console.log('Error Database -> ', err.message);
  });

export { app };
