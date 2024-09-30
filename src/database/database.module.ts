import { Global, Module } from '@nestjs/common';
import { ConfigurationModule } from '@app/config/configuration.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from '@app/config/interface';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (config: ConfigService) => {
        const databaseConfig = config.get<DatabaseConfig>('database');
        const { user, password, host, port, name, options } = databaseConfig;

        const appConfig = config.get<AppConfig>('app');
        const { env } = appConfig;

        console.log({ env });

        // const uri = `mongodb://${host}:${port}/${name}`;
        const uri: string =
          env === 'development' || env === 'production'
            ? `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}/${name}${options}`
            : `mongodb://${host}:${port}/${name}`;

        console.log( {uri} );
        return {
          uri,
          autoIndex: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
