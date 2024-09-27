import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Age, Gender, Language, VoiceAvailability, Server } from '@app/api/users/schemas/user.types';
import { BaseSchemaOptions } from '@app/utils/mongoose/base-schema-options';
import { AbstractSchema } from '@app/utils/mongoose/abstract.schema';
import { ThumbnailProfile, ThumbnailProfileSchema } from '@app/api/users/schemas/thumbnail-profile.schema';
@Schema(BaseSchemaOptions)
export class User extends AbstractSchema {
  @Prop({ required: true, type: String })
  username: string;
  @Prop({ required: true, type: String })
  password: string;
  @Prop({ required: true, type: String })
  email: string;
  @Prop({ required: true, type: String })
  friendKey: string;
  @Prop({ required: true, type: String })
  vrChatId: string;
  @Prop({ required: true, type: String, enum: ['male', 'female', 'other', 'secret'], default: '' })
  gender: Gender;
  @Prop({ required: true, type: String, enum: ['adult', 'minor', 'other', 'secret'], default: '' })
  age: Age;
  @Prop({ required: true, type: [String], enum: ['ko', 'ja', 'en', 'other'], default: [] })
  language: Language[];
  @Prop({ required: true, type: String, enum: ['possible', 'impossible', 'sometimes'], default: [] })
  voiceAvailability: VoiceAvailability;
  @Prop({ required: true, type: [String], enum: ['jp', 'kr', 'usa', 'eu'], default: [] })
  server: Server[];
  @Prop({ type: ThumbnailProfileSchema })
  thumbnail: ThumbnailProfile;
  @Prop({ required: true, type: Number, default: 0 })
  gemAmount: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
