import { Controller, Post, Body } from "@nestjs/common";
import { StripeService } from "./stripe.service";

@Controller('payments')
export class StripeController {
    constructor(private readonly stripeService: StripeService) { }

    @Post('create-payment-intent')
    async createPaymentIntent(@Body() body: { amount: number }) {
        const paymentIntent = await this.stripeService.createPaymentIntent(body.amount, 'usd');
        return {
            clientSecret: paymentIntent.client_secret,
        };
    }
}