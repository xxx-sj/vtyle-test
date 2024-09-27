import { AbstractSchema } from '@app/utils/mongoose/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchemaOptions } from '@app/utils/mongoose/base-schema-options';
import { HydratedDocument, SchemaTypes } from 'mongoose';

type FriendshipStatus = 'accepted' | 'blocked';

@Schema(BaseSchemaOptions)
export class UserFriend extends AbstractSchema {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  userId: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'users' })
  friendId: string;

  @Prop({ type: String, enum: ['accepted', 'blocked'], default: 'accepted' })
  status: FriendshipStatus;
}

export const UserFriendsSchema = SchemaFactory.createForClass(UserFriend);
export type UserFriendsDocument = HydratedDocument<UserFriend>;
