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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_schema_1 = require("./chat.schema");
let ChatService = class ChatService {
    constructor(chatModel) {
        this.chatModel = chatModel;
    }
    async getSenderMessages(senderId) {
        return this.chatModel.find({ senderId }).sort({ timestamp: 1 }).exec();
    }
    async getReceiverMessages(receiverId) {
        return this.chatModel.find({ receiverId }).sort({ timestamp: 1 }).exec();
    }
    async addMessage(senderId, message, receiverId) {
        const newMessage = new this.chatModel({ senderId, message, receiverId });
        return newMessage.save();
    }
    async saveMessage(data) {
        return await this.chatModel.create(data);
    }
    async getMessagesBetweenUsers(userId1, userId2) {
        return this.chatModel
            .find({
            $or: [
                { senderId: userId1, receiverId: userId2 },
                { senderId: userId2, receiverId: userId1 },
            ],
        })
            .sort({ timestamp: 1 });
    }
    async getAllConversationsForUser(userId) {
        try {
            const conversations = await this.chatModel.aggregate([
                {
                    $match: {
                        $or: [
                            { senderId: new mongoose_2.default.Types.ObjectId(userId) },
                            { receiverId: new mongoose_2.default.Types.ObjectId(userId) }
                        ]
                    }
                },
                {
                    $group: {
                        _id: {
                            $cond: [
                                { $eq: ['$senderId', new mongoose_2.default.Types.ObjectId(userId)] },
                                '$receiverId',
                                '$senderId'
                            ]
                        },
                        lastMessage: { $last: '$content' },
                        timestamp: { $last: '$timestamp' }
                    }
                },
                {
                    $project: {
                        userId: { $toString: '$_id' },
                        lastMessage: 1,
                        timestamp: 1,
                        _id: 0
                    }
                },
                {
                    $sort: { timestamp: -1 }
                }
            ]);
            return conversations;
        }
        catch (error) {
            console.error('Error in getAllConversationsForUser:', error);
            throw error;
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_schema_1.ChatEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ChatService);
//# sourceMappingURL=chat.service.js.map