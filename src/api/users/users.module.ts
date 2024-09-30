import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/api/users/schemas';
import { UserFriendsModule } from '@app/api/users/module/friends/user-friends.module';
import { UsersRepository } from '@app/api/users/users.repository';
import { FriendRequestModule } from '@app/api/users/module/friend-request/friend-request.module';

@Module({
  imports: [
    UserFriendsModule,
    FriendRequestModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [MongooseModule],
})
export class UsersModule {}
