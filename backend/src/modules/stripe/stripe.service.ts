import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
@Injectable()
export class StripeService {
    private stripe: Stripe;
    constructor() {
        this.stripe = new Stripe('sk_test_51QgvsE4RRFp4tU4inLzY2Pp8TPYmuVFJwA7yr3EASY35JFxXkp0GxP77CRbvi8h6qS0t77eC74ktUKBH1yw0hF6d00yFh2YOdR', {
            apiVersion: '2024-12-18.acacia',
        });
    }
    async createPaymentIntent(amount: number, currency: string) {
        return this.stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card'],
            capture_method: 'automatic',
        });
    }
}
