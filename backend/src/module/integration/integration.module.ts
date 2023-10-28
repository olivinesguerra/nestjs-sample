import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { StripeController } from "./stripe/stripe.controller";
import { UserRepository } from "../../repository/user.respository";
import { StripeRepository } from "../../repository/stripe.repository";
import { User } from "../../models/user.entity";
import { StripeService } from "../integration/stripe/stripe.service";

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [StripeController],
    providers: [UserRepository, StripeService, StripeRepository],
})
export class IntegrationModule { }