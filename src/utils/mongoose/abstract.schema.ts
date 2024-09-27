import { Document } from 'mongoose';
import { Schema } from '@nestjs/mongoose';

@Schema()
export class AbstractSchema extends Document {
  id?: string;
}
