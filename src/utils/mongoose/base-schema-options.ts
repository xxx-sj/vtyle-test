import { SchemaOptions } from 'mongoose';

export const BaseSchemaOptions: SchemaOptions = {
  id: true,
  strict: false,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
    },
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
    },
  },
  timestamps: true,
};
