import { IsEmail, MinLength, IsDefined } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;

    @IsDefined()
    phone: string;

    @IsDefined()
    name: string;
}