"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const user_module_1 = require("../user/user.module");
const jwt_strategy_1 = require("./jwt.strategy");
const app_config_1 = require("./../../configuration/app.config");
const axios_1 = require("@nestjs/axios");
const services_module_1 = require("../services/services.module");
const booking_module_1 = require("../bookings/booking.module");
const socket_module_1 = require("../socket/socket.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule.register({ defaultStrategy: "jwt" }),
            jwt_1.JwtModule.registerAsync({
                useFactory: async () => ({
                    secret: app_config_1.AppConfig.authConfig.publicKey,
                    signOptions: {},
                }),
            }),
            axios_1.HttpModule,
            services_module_1.ServiceModule,
            booking_module_1.BookingModule,
            socket_module_1.SocketModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map