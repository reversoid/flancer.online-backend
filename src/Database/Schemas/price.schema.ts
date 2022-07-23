import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type PriceDocument = Price & Document;

@Schema()
export class Price {
    constructor(from: number | null, to: number | null) {
        this.from = from;
        this.to = to;
    }

    @Prop({required: true})
    from: number | null;

    @Prop({required: true})
    to: number | null;
}

export const PriceSchema = SchemaFactory.createForClass(Price)
