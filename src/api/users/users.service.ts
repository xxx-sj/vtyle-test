import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@app/api/users/users.repository';
import { CreateUserDto } from '@app/api/users/dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async create(dto: CreateUserDto) {
    await this.repository.create(dto);
  }
}
