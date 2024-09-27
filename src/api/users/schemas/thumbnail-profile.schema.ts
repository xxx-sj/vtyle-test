import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ _id: false })
export class ThumbnailProfile {
  @Prop({ type: SchemaTypes.ObjectId, get: (v: Types.ObjectId) => v?.toString(), required: true })
  profileId: string;
  @Prop({ type: String, required: true })
  profileUrl: string;
  @Prop({ type: Number, required: true })
  rating: number;
}

export const ThumbnailProfileSchema = SchemaFactory.createForClass(ThumbnailProfile);
