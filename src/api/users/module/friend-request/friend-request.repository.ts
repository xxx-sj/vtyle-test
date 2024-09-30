import { AbstractRepository } from '@app/utils/mongoose/abstract.repository';
import {
  FriendRequest,
  FriendRequestDocument,
} from '@app/api/users/module/friend-request/schemas/friend-request.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class FriendRequestRepository extends AbstractRepository<FriendRequestDocument> {
  protected readonly logger = new Logger(FriendRequestRepository.name);
  constructor(@InjectModel(FriendRequest.name) model: Model<FriendRequestDocument>) {
    super(model);
  }
}
