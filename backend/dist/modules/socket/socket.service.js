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
exports.SocketService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const socket_schema_1 = require("./socket.schema");
const mongoose_2 = require("mongoose");
let SocketService = class SocketService {
    constructor(socketModel) {
        this.socketModel = socketModel;
    }
    async create(createSocketDto) {
        console.log("CreateSocketDto before save:", createSocketDto);
        try {
            const createdSocket = new this.socketModel(createSocketDto);
            const result = await createdSocket.save();
            console.log("Saved result:", result);
            return result;
        }
        catch (error) {
            console.error("Error saving socket:", error);
            throw new Error("Failed to save socket");
        }
    }
    async getAll(id) {
        const messages = await this.socketModel
            .find({
            userId: id
        })
            .exec();
        return messages;
    }
    async delete(id) {
        const message = await this.socketModel.findByIdAndDelete(id).exec();
        return message;
    }
};
exports.SocketService = SocketService;
exports.SocketService = SocketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(socket_schema_1.Socket.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SocketService);
//# sourceMappingURL=socket.service.js.map