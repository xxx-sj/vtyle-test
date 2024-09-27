import { registerAs } from '@nestjs/config';
import { AppConfig } from './interface';

export const appConfig = registerAs<AppConfig>('app', () => ({
  host: process.env.APP_HOST || 'localhost',
  port: parseInt(process.env.APP_PORT || '3000', 10),
  env: process.env.NODE_ENV || '',
  httpTimeout: parseInt(process.env.HTTP_TIMEOUT || '5000'),
  httpMaxRedirects: parseInt(process.env.HTTP_MAX_REDIRECTS || '5'),
}));
