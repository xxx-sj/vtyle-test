import { DatabaseConfig } from './database-config.interface';

export interface RedisConfig extends Omit<DatabaseConfig, 'name' | 'options' | 'user'> {
  /**
   * host
   * port
   * username // Redis 6.0 이상에서 필요한 경우 설정
   * password
   * db: 0 index
   * maxRe
   */
  db: number;
  username: string | null;
  maxRetriesPerRequest: number | null; //null
  connectTimeout: number; // 10000
  commandTimeout: number; // 5000
  enableReadyCheck: boolean; //true
  retryStrategy: (times: number) => number | null;
}
