import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserFriend, UserFriendsSchema } from '@app/api/users/module/friends/schemas/user-friend.schema';
import { UserFriendsController } from './user-friends.controller';
import { UserFriendsService } from './user-friends.service';
import { UserFriendsRepository } from '@app/api/users/module/friends/user-friends.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserFriend.name, schema: UserFriendsSchema }])],
  controllers: [UserFriendsController],
  providers: [UserFriendsService, UserFriendsRepository],
  exports: [MongooseModule],
})
export class UserFriendsModule {}
