import { DataSource } from 'typeorm';
import { config } from 'dotenv';

import { ENTITIES } from './entities';
import { MIGRATIONS } from './migrations';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  migrationsRun: process.env.DB_MIGRATE === 'true',
  entities: [...ENTITIES],
  migrations: [...MIGRATIONS],
});
