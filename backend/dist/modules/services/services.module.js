"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../user/user.module");
const axios_1 = require("@nestjs/axios");
const service_schema_1 = require("./schema/service.schema");
const services_controller_1 = require("./services.controller");
const services_service_1 = require("./services.service");
let ServiceModule = class ServiceModule {
};
exports.ServiceModule = ServiceModule;
exports.ServiceModule = ServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: service_schema_1.ServiceEntity.name, schema: service_schema_1.ServiceSchema }]),
            user_module_1.UserModule,
            axios_1.HttpModule,
        ],
        controllers: [services_controller_1.ServiceController],
        providers: [services_service_1.ServiceService],
        exports: [services_service_1.ServiceService],
    })
], ServiceModule);
//# sourceMappingURL=services.module.js.map