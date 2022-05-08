import mongoose from "mongoose";
import { Competence } from "src/Database/Schemas/competence.schema";

export class CreateOrderDto {
    // user: mongoose.Types.ObjectId;
    title: string;
    text: string;
    competencies: Array<string>;
}