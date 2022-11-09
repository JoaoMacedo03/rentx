import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';

import { dataSource } from '@shared/database/typeorm/dataSource';
import { router } from '@shared/infra/http/routes';

import '@shared/container';
import swaggerFile from '../../../doc/swagger.json';
import { appErrorResponse } from './middlewares/appErrorResponse';

dataSource
  .initialize()
  .then(() => {
    console.log('💥️ Database initialized');
    const app = express();

    app.use(express.json());

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

    app.use(router);

    app.use(appErrorResponse);

    app.listen(3333, () => console.log('😈️ Server is running!'));
  })
  .catch(err => {
    console.log('Error Database -> ', err);
  });
