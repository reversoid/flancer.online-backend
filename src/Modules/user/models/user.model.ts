import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IUser {
  _id?: string;
  email: string;
  passwordHash: string;
  name: IName;
  phone: string;
}

export class IName {first: string; last: string;}

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class User extends Document implements IUser {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, type: IName })
  name: {
    first: string;
    last: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
