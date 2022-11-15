import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

import ormConfig from '@config/ormconfig.json';

ormConfig.database = process.env.NODE_ENV === 'test' ? 'rentx_test' : 'rentx';
ormConfig.host =
  process.env.NODE_ENV === 'test' ? 'localhost' : 'rentx_database';

export const dataSource = new DataSource(ormConfig as DataSourceOptions);
