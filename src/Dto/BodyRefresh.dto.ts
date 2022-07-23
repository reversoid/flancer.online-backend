import { IsNotEmpty, IsString } from "class-validator";

export class BodyRefresh {
    @IsNotEmpty()
    @IsString()
    id: string;
}