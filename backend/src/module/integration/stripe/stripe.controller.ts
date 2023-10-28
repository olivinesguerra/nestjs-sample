import {
    Controller,
    UseGuards,
    Post,
    Put,
    Delete,
    Get,
    Body,
    Param,
    Query
} from '@nestjs/common';
import { RoleGuard } from "../../../guards/role.guard";
import { Roles } from "../../auth/roles";
import { AccessTokenGuard } from "../../../guards/accessToken.guard";
import { UserType } from "../../../util/constants";

import { StripeService } from "../stripe/stripe.service";

import { SearchProductsValidator } from "./stripe.validator";

@Controller("integ/stripe")
export class StripeController {
    constructor(
        private stripeService: StripeService
    ) { }

    @Roles(UserType.Admin)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Post()
    async createProduct(@Body() body: any) {
        return this.stripeService.createProduct(body);
    }

    @Roles(UserType.Admin)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Put(":id")
    async updateProduct(@Param() id: string, @Body() body: any) {
        return this.stripeService.updateProduct(id, body);
    }

    @Roles(UserType.Admin)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Delete(":id")
    async deleteProduct(@Param() id: string) {
        return this.stripeService.deleteProduct(id);
    }

    @Roles(UserType.Admin)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Get()
    async getProducts(@Query() query: SearchProductsValidator) {
        return this.stripeService.getProducts(query);
    }

}
