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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chat_service_1 = require("./chat.service");
const chat_dto_1 = require("./chat.dto");
const decorators_1 = require("../../decorators");
const userRoles_1 = require("../../casl/userRoles");
const user_schema_1 = require("../user/user.schema");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async getMessages(user) {
        const userId = user.id;
        return this.chatService.getAllMessages(userId);
    }
    async addMessage(user, body) {
        const { sender, message } = body;
        const userId = user.id;
        await this.chatService.addMessage(sender, message, userId);
        const botResponse = await this.chatService.getBotResponse(message, userId);
        return {
            userMessage: message,
            botResponse,
        };
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all chat messages for a user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all messages for the specified user',
        type: [chat_dto_1.ChatMessage],
    }),
    (0, common_1.Get)(),
    (0, decorators_1.Auth)(userRoles_1.Action.Update, "Chat"),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getMessages", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add a new message and get bot response if sender is user' }),
    (0, swagger_1.ApiBody)({ type: chat_dto_1.AddMessageDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Message added successfully with bot response if applicable' }),
    (0, common_1.Post)(),
    (0, decorators_1.Auth)(userRoles_1.Action.Update, "Chat"),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, chat_dto_1.AddMessageDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "addMessage", null);
exports.ChatController = ChatController = __decorate([
    (0, swagger_1.ApiTags)('Chat'),
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map