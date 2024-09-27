import { AbstractRepository } from '@app/utils/mongoose/abstract.repository';
import { UserFriend, UserFriendsDocument } from '@app/api/users/module/friends/schemas/user-friend.schema';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class UserFriendsRepository extends AbstractRepository<UserFriendsDocument> {
  protected readonly logger = new Logger(UserFriendsRepository.name);
  constructor(@InjectModel(UserFriend.name) model: Model<UserFriendsDocument>) {
    super(model);
  }
}
