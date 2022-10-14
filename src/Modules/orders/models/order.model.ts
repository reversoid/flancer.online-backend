import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Competence, ICompetence } from "./competence.model";
import { Document, now } from 'mongoose';

export class NumericFromTo {
    from: number | null;
    to: number | null;
}

export interface IOrder {
    user: string;
    title: string;
    text: string;
    competencies: ICompetence[];
    price: NumericFromTo;
    timePeriod: NumericFromTo | null;
}

@Schema({timestamps: {createdAt: true, updatedAt: false}})
export class Order extends Document implements IOrder{
    @Prop({required: true, ref: 'User'})
    user: string;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    text: string;

    @Prop({required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Competence' }] })
    competencies: Competence[];

    @Prop({ required: true, type: NumericFromTo })
    price: NumericFromTo;

    @Prop({required: true})
    timePeriod: NumericFromTo | null;

    @Prop({default: now()})
    createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order)
