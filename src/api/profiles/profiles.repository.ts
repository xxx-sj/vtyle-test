import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { AbstractRepository } from '@app/utils/mongoose/abstract.repository';
import { Profile, ProfileDocument } from '@app/api/profiles/schemas/profile.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProfilesRepository extends AbstractRepository<ProfileDocument> {
  protected readonly logger = new Logger(ProfilesRepository.name);
  constructor(@InjectModel(Profile.name) model: Model<ProfileDocument>) {
    super(model);
  }
}
