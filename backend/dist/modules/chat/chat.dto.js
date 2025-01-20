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
exports.ChatMessage = exports.AddMessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AddMessageDto {
}
exports.AddMessageDto = AddMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sender of the message (e.g., user or bot)' }),
    __metadata("design:type", String)
], AddMessageDto.prototype, "sender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message content' }),
    __metadata("design:type", String)
], AddMessageDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier of the user', required: true }),
    __metadata("design:type", String)
], AddMessageDto.prototype, "userId", void 0);
class ChatMessage {
}
exports.ChatMessage = ChatMessage;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sender of the message' }),
    __metadata("design:type", String)
], ChatMessage.prototype, "sender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message content' }),
    __metadata("design:type", String)
], ChatMessage.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Timestamp of the message' }),
    __metadata("design:type", Date)
], ChatMessage.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier of the user' }),
    __metadata("design:type", String)
], ChatMessage.prototype, "userId", void 0);
//# sourceMappingURL=chat.dto.js.map