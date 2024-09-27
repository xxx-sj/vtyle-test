import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchemaOptions } from '@app/utils/mongoose/base-schema-options';
import { AbstractSchema } from '@app/utils/mongoose/abstract.schema';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

type ProfileStatus = 'review' | 'approved' | 'cancelled';

@Schema(BaseSchemaOptions)
export class Profile extends AbstractSchema {
  @Prop({ type: SchemaTypes.ObjectId, get: (v: Types.ObjectId) => v?.toString(), required: true })
  userId: string;

  @Prop({ type: String, required: true, default: 'review' })
  status: ProfileStatus;

  @Prop({ type: Boolean, required: true, default: false })
  thumbnail: boolean;

  @Prop({ type: String, required: true })
  originProfileUrl: string;

  @Prop({ type: String, required: true })
  profileUrl: string;

  @Prop({ type: Number, default: 0 })
  rating: number;

  @Prop({ type: Number, default: 0 })
  totalRating: number;

  @Prop({ type: Number, default: 0 })
  evaluationCount: number;

  @Prop({ type: Date })
  evaluationCompletedAt?: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
export type ProfileDocument = HydratedDocument<Profile>;
