import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from '@app/api/users/users.service';
import { CreateUserDto } from '@app/api/users/dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto) {
    await this.service.create(dto);
  }
}
