import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from '@app/config/app.config';
import { databaseConfig } from '@app/config/database.config';
import { redisConfig } from '@app/config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig, redisConfig],
    }),
  ],
})
export class ConfigurationModule {}
