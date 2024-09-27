import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './config/interface/configuration.interface';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/GlobalExceptionFilter';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const configService = app.get(ConfigService);

  const appConfig = configService.get('app');
  const dbConfig = configService.get('database');
  // const redisConfig = configService.get('redis');

  if (!appConfig) {
    throw new Error('App configuration is missing. occurred while reading environment variables.');
  }

  if (!dbConfig) {
    throw new Error('DB configuration is missing. occurred while reading environment variables.');
  }

  // if (!redisConfig) {
  //   throw new Error('Redis configuration is missing. occurred while reading environment variables.');
  // }

  const configuration = {
    app: appConfig,
    database: dbConfig,
    // redis: redisConfig,
  } as Configuration;

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(configuration.app.port, configuration.app.host);
}

bootstrap().then(() => {});
