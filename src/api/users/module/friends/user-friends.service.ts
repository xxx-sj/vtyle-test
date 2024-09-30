import { Injectable } from '@nestjs/common';
import { UserFriendsRepository } from '@app/api/users/module/friends/user-friends.repository';
import { PaginationDto } from '@app/common/dto/Pagination.dto';
import { Types } from 'mongoose';
import { LookupReferences } from '@app/utils/mongoose/lookup-references';
import { User } from '@app/api/users/schemas';
import { CreateUserFriendDto } from '@app/api/users/module/friends/dto/create-user-friend.dto';

@Injectable()
export class UserFriendsService {
  constructor(private readonly repository: UserFriendsRepository) {}
  async findAll(paginationDto: PaginationDto, userId: string) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const filter = { userId: new Types.ObjectId(userId) };
    const options = { skip: skip, limit: limit, sort: { createdAt: 1 } };
    const foreignKey = 'friendId';
    const reference = 'friend';
    const lookup = new LookupReferences(`${User.name}s`, foreignKey, reference);

    return (await this.repository.aggregateWithLookup(filter, options, lookup)).map((doc) => doc[reference]);
  }

  //TODO
  async create(dto: CreateUserFriendDto) {
    await this.repository.create(dto);
  }
}
