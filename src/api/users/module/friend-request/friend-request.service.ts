import { Injectable } from '@nestjs/common';
import { CreateFriendRequestDto } from '@app/api/users/module/friend-request/dto/create-friend-request.dto';
import { FriendRequestRepository } from '@app/api/users/module/friend-request/friend-request.repository';

@Injectable()
export class FriendRequestService {
  constructor(private readonly repository: FriendRequestRepository) {
  }

  async create(dto: CreateFriendRequestDto) {
    await this.repository.create(dto);
  }
}
