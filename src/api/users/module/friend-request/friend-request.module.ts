import { Module } from '@nestjs/common';
import { FriendRequestController } from './friend-request.controller';
import { FriendRequestService } from './friend-request.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequest, FriendRequestSchema } from '@app/api/users/module/friend-request/schemas/friend-request.schema';
import { FriendRequestRepository } from '@app/api/users/module/friend-request/friend-request.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: FriendRequest.name, schema: FriendRequestSchema }])],
  controllers: [FriendRequestController],
  providers: [FriendRequestService, FriendRequestRepository],
})
export class FriendRequestModule {}
