import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ProfilesService } from '@app/api/profiles/profiles.service';
import { PaginationDto } from '@app/common/dto/Pagination.dto';
import { TransformDto } from '@app/common/interceptors/response/decorators/transform-dto.decorator';
import { UserProfileResponseDto } from '@app/api/users/dto/user-profile-response.dto';
import { CreateProfileDto } from '@app/api/profiles/dto/create-profile.dto';
import { ProfileResponseDto } from '@app/api/profiles/dto/profile-response.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly service: ProfilesService) {}

  @Get('rated-me')
  @TransformDto(UserProfileResponseDto)
  async getRaters(@Query() paginationDto: PaginationDto) {
    const userId = '66f36956de19c31261a58524';
    return await this.service.getRaters(paginationDto, userId);
  }

  @Get('rated')
  @TransformDto(UserProfileResponseDto)
  async getRatedUsers(@Query() paginationDto: PaginationDto) {
    const userId = '66f36a18de19c31261a5853b';
    return await this.service.getRatedUsers(paginationDto, userId);
  }

  @Get('gold-card-achievers')
  @TransformDto(ProfileResponseDto)
  async getGoldCardAchievers(@Query() paginationDto: PaginationDto) {
    return await this.service.getGoldCardAchievers(paginationDto);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProfileDto) {
    await this.service.create(dto);
  }
}
