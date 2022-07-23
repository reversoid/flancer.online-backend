import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({timestamps: {createdAt: true, updatedAt: false}})
export class User {
    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    phone: string;

    @Prop({required: true})
    name: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
