import { IsEmail, IsString } from "class-validator";

export class UserRegisterDto {

    @IsString()
    name:string;

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    resident:string;

    @IsString()
    phone:string;

    @IsString()
    lada:string;
}