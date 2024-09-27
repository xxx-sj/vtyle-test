import { registerAs } from '@nestjs/config';
import { RedisConfig } from '@app/config/interface';

export const redisConfig = registerAs<RedisConfig>('redis', () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  username: process.env.REDIS_USERNAME || 'default',
  password: process.env.REDIS_PASSWORD || '',
  db: parseInt(process.env.REDIS_INDEX || '0', 10),
  maxRetriesPerRequest: (() => {
    const value = parseInt(process.env.REDIS_MAX_RETRY_PER_REQUEST || '', 10);
    return isNaN(value) ? null : value;
  })(),
  connectTimeout: (() => {
    const value = parseInt(process.env.REDIS_CONNECT_TIMEOUT || '10000', 10);
    return isNaN(value) ? 10000 : value;
  })(),
  commandTimeout: (() => {
    const value = parseInt(process.env.REDIS_COMMAND_TIMEOUT || '5000', 10);
    return isNaN(value) ? 5000 : value;
  })(),
  enableReadyCheck: process.env.REDIS_ENABLE_READY_CHECK !== 'false',
  retryStrategy: (times: number): number | null => {
    const maxDelay = parseInt(process.env.REDIS_RETRY_MAX_DELAY || '2000', 10);
    return Math.min(times * 100, isNaN(maxDelay) ? 2000 : maxDelay);
  },
}));
