import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from '@app/config/interface';
import * as process from 'process';

export const databaseConfig = registerAs<DatabaseConfig>('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '27017', 10),
  name: process.env.DATABASE_NAME || '',
  user: process.env.DATABASE_USER || '',
  password: process.env.DATABASE_PASSWORD || '',
  options: process.env.DATABASE_OPTIONS || '',
}));
