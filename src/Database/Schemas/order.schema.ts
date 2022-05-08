import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document } from 'mongoose';
import { Competence, CompetenceSchema } from "./competence.schema";

export type OrderDocument = Order & Document;

@Schema({timestamps: {createdAt: true, updatedAt: false}})
export class Order {
    // @Prop({required: true, ref: 'User'})
    // user: mongoose.Types.ObjectId;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    text: string;

    // TODO use specific type later
    @Prop({required: true})
    competencies: Array<string>;

    createdAt: Date;

    // TODO make special type for price
    // @Prop({required: true, type: {}})
    // price: {from?: number, to?: number};

    // @Prop({required: false})
    // timePeriod: {from?: Date, to?: Date};
}

export const OrderSchema = SchemaFactory.createForClass(Order)
