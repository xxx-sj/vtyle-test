import { AppConfig } from './app-config.interface';
import { DatabaseConfig } from './database-config.interface';
import { RedisConfig } from './redis-config.interface';

export interface Configuration {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
}
