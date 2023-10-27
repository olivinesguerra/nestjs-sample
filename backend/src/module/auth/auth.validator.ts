import {
    Length,
    IsEmail,
    IsNotEmpty,
    IsEnum
} from 'class-validator';
import { USER_TYPE } from "../../util/enums";

export class LoginValidator {
    @IsNotEmpty()
    @Length(10, 20)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsEnum(USER_TYPE)
    type: USER_TYPE;
};

export class RegisterValidator {
    @IsNotEmpty()
    @Length(10, 20)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsEnum(USER_TYPE)
    type: USER_TYPE;
};