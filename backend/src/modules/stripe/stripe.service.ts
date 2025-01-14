import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe('rk_test_51QgvsE4RRFp4tU4iYXivaDprP1VrwPhN1DJ2N0h7P6ty3v1G0xJ8a70PDSS9pcqb7QIRBXEmvV00qEHayz0YAdR300NocNQiFr', {
            apiVersion: '2024-12-18.acacia', // Update to the latest version if necessary
        });
    }

    async createPaymentIntent(amount: number, currency: string) {
        return this.stripe.paymentIntents.create({
            amount,
            currency,
        });
    }
}
