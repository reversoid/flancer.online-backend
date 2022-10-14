import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export interface ICompetence {
    _id: string;
    path: string;
}

@Schema({_id: false})
export class Competence extends Document implements ICompetence{
    @Prop({required: true})
    _id: string;

    @Prop({required: true})
    path: string | null;
}

export const CompetenceSchema = SchemaFactory.createForClass(Competence)
