import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserRepository } from "../../../repository/user.respository";
import { StripeRepository } from "../../../repository/stripe.repository";
import { SearchProductsValidator } from "./stripe.validator";

@Injectable()
export class StripeService {
    constructor(
        private userRespository: UserRepository,
        private stripeRepository: StripeRepository
    ) { }

    async createProduct(params: any) {
        return this.stripeRepository.createProduct(params);
    }

    async updateProduct(id: string, params: any) {
        return this.stripeRepository.updateProduct(id, params);
    }

    async deleteProduct(id: string) {
        return this.stripeRepository.deleteProduct(id);
    }

    async getProducts(query: SearchProductsValidator) {
        return this.stripeRepository.searchProducts(query);
    }

};