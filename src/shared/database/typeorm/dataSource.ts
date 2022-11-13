import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

import ormConfig from '@config/ormconfig.json';

export const dataSource = new DataSource(ormConfig as DataSourceOptions);
