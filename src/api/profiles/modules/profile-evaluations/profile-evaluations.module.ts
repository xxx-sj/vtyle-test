import { Module } from '@nestjs/common';
import { ProfileEvaluationsController } from './profile-evaluations.controller';
import { ProfileEvaluationsService } from './profile-evaluations.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProfileEvaluation,
  ProfileEvaluationSchema,
} from '@app/api/profiles/modules/profile-evaluations/schemas/profile-evaluation.schema';
import { ProfileEvaluationsRepository } from '@app/api/profiles/modules/profile-evaluations/profile-evaluations.repository';
import { UsersModule } from '@app/api/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProfileEvaluation.name, schema: ProfileEvaluationSchema }]),
    UsersModule,
  ],
  controllers: [ProfileEvaluationsController],
  providers: [ProfileEvaluationsService, ProfileEvaluationsRepository],
  exports: [ProfileEvaluationsRepository],
})
export class ProfileEvaluationsModule {}
