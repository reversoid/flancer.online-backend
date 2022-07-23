import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document } from 'mongoose';
import { Competence } from "./competence.schema";
import { Price } from "./price.schema";
import { TimePeriod } from "./timeperiod.schema";

export type OrderDocument = Order & Document;

@Schema({timestamps: {createdAt: true, updatedAt: false}})
export class Order {
    // @Prop({required: true, ref: 'User'})
    // user: mongoose.Types.ObjectId;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    text: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Competence' }] })
    competencies: Competence[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Price' })
    price: Price;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TimePeriod' })
    timeperiod: TimePeriod;

    createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order)
