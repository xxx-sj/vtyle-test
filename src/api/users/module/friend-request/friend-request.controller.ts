import { Body, Controller, Post } from '@nestjs/common';
import { FriendRequestService } from '@app/api/users/module/friend-request/friend-request.service';
import { CreateFriendRequestDto } from '@app/api/users/module/friend-request/module/create-friend-request.dto';

@Controller('friend-request')
export class FriendRequestController {
  constructor(private readonly service: FriendRequestService) {}

  @Post()
  async create(@Body() dto: CreateFriendRequestDto) {
    await this.service.create(dto);
  }
}
