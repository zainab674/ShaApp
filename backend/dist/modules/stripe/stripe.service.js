"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
let StripeService = class StripeService {
    constructor() {
        this.stripe = new stripe_1.default('sk_test_51QgvsE4RRFp4tU4inLzY2Pp8TPYmuVFJwA7yr3EASY35JFxXkp0GxP77CRbvi8h6qS0t77eC74ktUKBH1yw0hF6d00yFh2YOdR', {
            apiVersion: '2024-12-18.acacia',
        });
    }
    async createPaymentIntent(amount, currency) {
        return this.stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card'],
            capture_method: 'automatic',
        });
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StripeService);
//# sourceMappingURL=stripe.service.js.map