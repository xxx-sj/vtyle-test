import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { ProfilesRepository } from '@app/api/profiles/profiles.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from '@app/api/profiles/schemas/profile.schema';
import { ProfileEvaluationsModule } from '@app/api/profiles/modules/profile-evaluations/profile-evaluations.module';

@Module({
  imports: [ProfileEvaluationsModule, MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }])],
  providers: [ProfilesService, ProfilesRepository],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
