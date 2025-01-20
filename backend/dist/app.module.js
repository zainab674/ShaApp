"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const casl_module_1 = require("./casl/casl.module");
const configuration_module_1 = require("./configuration/configuration.module");
const configuration_service_1 = require("./configuration/configuration.service");
const logger_module_1 = require("./logger/logger.module");
const auth_module_1 = require("./modules/auth/auth.module");
const app_config_1 = require("./configuration/app.config");
const services_module_1 = require("./modules/services/services.module");
const booking_module_1 = require("./modules/bookings/booking.module");
const rating_module_1 = require("./modules/ratings/rating.module");
const socket_module_1 = require("./modules/socket/socket.module");
const stripe_module_1 = require("./modules/stripe/stripe.module");
const chat_module_1 = require("./modules/chat/chat.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            configuration_module_1.ConfigurationModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env.${process.env.NODE_ENV}`,
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: app_config_1.AppConfig.sendGridConfig.host,
                    secure: app_config_1.AppConfig.sendGridConfig.secure,
                    auth: {
                        user: app_config_1.AppConfig.sendGridConfig.user,
                        pass: app_config_1.AppConfig.sendGridConfig.password,
                    },
                },
                defaults: {
                    from: app_config_1.AppConfig.sendGridConfig.email,
                },
                template: {
                    dir: (0, path_1.join)(__dirname, "../src/views"),
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [configuration_module_1.ConfigurationModule],
                useFactory: async (configService) => configService.mongooseConfig,
                inject: [configuration_service_1.ConfigurationService],
            }),
            logger_module_1.LoggerModule,
            chat_module_1.ChatModule,
            auth_module_1.AuthModule,
            casl_module_1.CaslModule,
            booking_module_1.BookingModule,
            services_module_1.ServiceModule,
            rating_module_1.RatingModule,
            socket_module_1.SocketModule,
            stripe_module_1.StripeModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
        exports: [AppModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map