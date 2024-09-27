import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/utils/mongoose/abstract.repository';
import {
  ProfileEvaluation,
  ProfileEvaluationDocument,
} from '@app/api/profiles/modules/profile-evaluations/schemas/profile-evaluation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfileEvaluationsRepository extends AbstractRepository<ProfileEvaluationDocument> {
  protected readonly logger = new Logger(ProfileEvaluationsRepository.name);

  constructor(@InjectModel(ProfileEvaluation.name) model: Model<ProfileEvaluationDocument>) {
    super(model);
  }
}
