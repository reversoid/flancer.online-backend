import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type TimePeriodDocument = TimePeriod & Document;

@Schema()
export class TimePeriod {
    constructor(from: Date, to: Date) {
        this.from = from;
        this.to = to;
    }
    @Prop({required: true})
    from: Date | null;

    @Prop({required: true})
    to: Date | null;
}

export const TimePeriodSchema = SchemaFactory.createForClass(TimePeriod)
