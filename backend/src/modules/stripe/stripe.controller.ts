import { Controller, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
import { StripeService } from "./stripe.service";

@Controller('payments')
export class StripeController {
    constructor(private readonly stripeService: StripeService) { }

    @Post('create-payment-intent')
    async createPaymentIntent(@Body() body: { amount: number }) {
        try {
            const paymentIntent = await this.stripeService.createPaymentIntent(
                Math.round(body.amount),
                'usd'
            );
            console.log("clientsecret", paymentIntent.client_secret)
            return { clientSecret: paymentIntent.client_secret };
        } catch (error) {
            console.error('Payment intent error:', error);
            throw new HttpException('Payment intent creation failed', HttpStatus.BAD_REQUEST);
        }
    }
}