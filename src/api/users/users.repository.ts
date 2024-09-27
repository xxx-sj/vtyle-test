import { AbstractRepository } from '@app/utils/mongoose/abstract.repository';
import { User, UserDocument } from '@app/api/users/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class UsersRepository extends AbstractRepository<UserDocument> {
  protected readonly logger = new Logger(UsersRepository.name);
  constructor(@InjectModel(User.name) model: Model<UserDocument>) {
    super(model);
  }
}
