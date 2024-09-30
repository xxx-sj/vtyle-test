import { AbstractSchema } from '@app/utils/mongoose/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchemaOptions } from '@app/utils/mongoose/base-schema-options';
import { HydratedDocument, SchemaTypes } from 'mongoose';

type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';
@Schema(BaseSchemaOptions)
export class FriendRequest extends AbstractSchema {

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  userId: string;
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  receiverId: string;
  @Prop({ type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
  status: FriendRequestStatus;
  @Prop({ type: Date, default: Date.now })
  requestedAt: Date;
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);
export type FriendRequestDocument = HydratedDocument<FriendRequest>;
