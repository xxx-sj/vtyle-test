import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from '@app/config/configuration.module';
import { DatabaseModule } from '@app/database/database.module';
import { CommonModule } from '@app/common/common.module';
import { ApiModule } from '@app/api/api.module';

@Module({
  imports: [ConfigurationModule, ApiModule, DatabaseModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
