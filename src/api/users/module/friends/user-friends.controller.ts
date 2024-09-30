import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserFriendsService } from '@app/api/users/module/friends/user-friends.service';
import { PaginationDto } from '@app/common/dto/Pagination.dto';
import { TransformDto } from '@app/common/interceptors/response/decorators/transform-dto.decorator';
import { UserFriendResponseDto } from '@app/api/users/module/friends/dto/user-friend-response.dto';
import { CreateUserFriendDto } from '@app/api/users/module/friends/dto/create-user-friend.dto';

@Controller('friends')
export class UserFriendsController {
  constructor(private readonly service: UserFriendsService) {}

  @Get()
  @TransformDto(UserFriendResponseDto)
  async findAll(@Query() paginationDto: PaginationDto, @Param() userId: string) {
    return await this.service.findAll(paginationDto, userId);
  }

  //TODO
  @Post()
  async create(@Body() dto: CreateUserFriendDto) {
    await this.service.create(dto);
  }
}
