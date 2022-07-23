import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type CompetenceDocument = Competence & Document;

@Schema()
export class Competence {
    @Prop({required: true})
    value: string;
}

export const CompetenceSchema = SchemaFactory.createForClass(Competence)
