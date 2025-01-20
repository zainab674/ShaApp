import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CaslModule } from "./casl/casl.module";
import { ConfigurationModule } from "./configuration/configuration.module";
import { ConfigurationService } from "./configuration/configuration.service";
import { LoggerModule } from "./logger/logger.module";
import { AuthModule } from "./modules/auth/auth.module";

import { AppConfig } from "./configuration/app.config";

import { ServiceModule } from "./modules/services/services.module";
import { BookingModule } from "./modules/bookings/booking.module";
import { RatingModule } from "./modules/ratings/rating.module";
import { SocketModule } from "./modules/socket/socket.module";
import { StripeModule } from "./modules/stripe/stripe.module";
import { ChatModule } from "./modules/chat/chat.module";
// import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [

    ConfigurationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MailerModule.forRoot({
      transport: {
        host: AppConfig.sendGridConfig.host,
        secure: AppConfig.sendGridConfig.secure,
        auth: {
          user: AppConfig.sendGridConfig.user,
          pass: AppConfig.sendGridConfig.password,
        },
      },
      defaults: {
        from: AppConfig.sendGridConfig.email,
      },
      template: {
        dir: join(__dirname, "../src/views"),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configService: ConfigurationService) =>
        configService.mongooseConfig,
      inject: [ConfigurationService],
    }),
    LoggerModule,
    ChatModule,
    AuthModule,
    CaslModule,
    BookingModule,
    ServiceModule,
    RatingModule,
    SocketModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppModule],
})
export class AppModule { }
