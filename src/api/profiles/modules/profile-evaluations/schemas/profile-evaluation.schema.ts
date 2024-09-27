import { AbstractSchema } from '@app/utils/mongoose/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchemaOptions } from '@app/utils/mongoose/base-schema-options';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { User } from '@app/api/users/schemas';

@Schema(BaseSchemaOptions)
export class ProfileEvaluation extends AbstractSchema {
  @Prop({ type: SchemaTypes.ObjectId, get: (v: Types.ObjectId) => v?.toString(), required: true })
  userId: string;

  @Prop({ type: SchemaTypes.ObjectId, get: (v: Types.ObjectId) => v?.toString(), required: true })
  profileId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, get: (v: Types.ObjectId) => v?.toString() })
  evaluatorId?: string;

  @Prop({ type: Number, max: 5, required: true, default: 0 })
  rating?: number;

  @Prop({ type: Date })
  evaluatedAt?: Date;

  @Prop({ type: Boolean, required: true, default: false })
  isUnlocked: boolean;
}

export const ProfileEvaluationSchema = SchemaFactory.createForClass(ProfileEvaluation);
export type ProfileEvaluationDocument = HydratedDocument<ProfileEvaluation>;
