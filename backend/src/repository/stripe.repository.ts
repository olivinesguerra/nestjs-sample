import { Injectable } from '@nestjs/common';
import axios from "axios";
import Stripe from "stripe";

import { SearchProductsValidator } from "../module/integration/stripe/stripe.validator";

const stripe = new Stripe('sk_test_your_key');

@Injectable()
export class StripeRepository {
    constructor() { }

    async createProduct(params: any) {
        const product = await stripe.products.create(params);
        return product;
    }

    async getProduct(id: string) {
        const product = await stripe.products.retrieve(id);
        return product;
    }

    async updateProduct(id: string, data: any) {
        const product = await stripe.products.update(
            id,
            { metadata: data }
        );
        return product;
    }

    async getProducts(
        params: any
    ) {
        const products = await stripe.products.list(params);
        return products;
    }

    async deleteProduct(
        id: string
    ) {
        const deleted = await stripe.products.del(id);
        return deleted;
    }

    async searchProducts(query: SearchProductsValidator) {
        const product = await stripe.products.search({
            query: query?.query,
        });
        return product;
    }
}