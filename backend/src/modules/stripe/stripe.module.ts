import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig } from 'src/configuration/app.config';
import Stripe from 'stripe';
import { StripeSchema } from './stripe.schema';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Stripe.name, schema: StripeSchema }]),
        // AuthModule,
        JwtModule.registerAsync({
            useFactory: async () => ({
                secret: AppConfig.authConfig.publicKey,
                signOptions: {
                    // expiresIn: AppConfig.authConfig.jwtExpirationTime,
                },
            }),
        }),
    ],
    controllers: [StripeController],
    providers: [StripeService],
    exports: [],
})
export class StripeModule { }
