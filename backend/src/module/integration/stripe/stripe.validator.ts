import {
    Length,
    IsEmail,
    IsNotEmpty,
    IsOptional
} from 'class-validator';

export class GetStripeProductsValidataor {
    @IsNotEmpty()
    @Length(10, 20)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
};


export class SearchProductsValidator {
    @IsNotEmpty()
    query: string;

    @IsOptional()
    limit: string;

    @IsOptional()
    page: string;
};