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
exports.MyGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../auth/auth.service");
const socket_service_1 = require("./socket.service");
const create_socket_dto_1 = require("./dto/create-socket.dto");
const chat_service_1 = require("../chat/chat.service");
let MyGateway = class MyGateway {
    constructor(authService, socketService, chatService) {
        this.authService = authService;
        this.socketService = socketService;
        this.chatService = chatService;
        this.clients = new Map();
    }
    async getUserFromSocket(socket) {
        const token = socket.handshake.headers.authorization;
        return (this.authService.getUserFromToken(token) || "");
    }
    async handleConnection(socket) {
        const token = socket.handshake.headers.authorization;
        const user = await this.authService.getUserFromToken(token);
        if (user) {
            this.clients.set(user.userId, socket);
            console.log("Client connected: ", user.userId);
            const messages = await this.socketService.getAll(user.userId);
            socket.emit('allMessages', messages);
        }
        else {
            socket.emit('error', { message: 'Unauthorized' });
            socket.disconnect();
        }
    }
    handleDisconnect(socket) {
        for (let [userId, clientSocket] of this.clients.entries()) {
            if (clientSocket.id === socket.id) {
                this.clients.delete(userId);
                console.log("Client disconnected:", userId);
                break;
            }
        }
    }
    async handleBookingStatusUpdated(socket, createSocketDto) {
        console.log("Event: bookingStatusUpdated triggered");
        if (typeof createSocketDto === 'string') {
            try {
                createSocketDto = JSON.parse(createSocketDto);
            }
            catch (error) {
                console.log("Error parsing createSocketDto:", error);
                return;
            }
        }
        console.log("Parsed data:", createSocketDto);
        const data = await this.socketService.create(createSocketDto);
        console.log("Data saved:", data);
        const { userId, message } = createSocketDto;
        const userIdString = userId.toString();
        console.log("Resolved userIdString:", userIdString);
        const recipientSocket = this.clients.get(userIdString);
        if (recipientSocket) {
            this.server.to(recipientSocket.id).emit('bookingStatusUpdated', message);
            console.log(`Notification sent to user ${userId}`);
        }
        else {
            console.log(`User ${userId} not connected.`);
        }
    }
    async handleGetUserMessages(socket) {
        const user = await this.getUserFromSocket(socket);
        if (!user) {
            socket.emit('error', { message: 'Unauthorized' });
            return;
        }
        const messages = await this.socketService.getAll(user.userId);
        socket.emit('allMessages', messages);
    }
    async handleSendMessage(socket, body) {
        console.log('sendMessage received:', body);
        console.log("body", body);
        console.log("typeof(body)", typeof (body));
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body);
            }
            catch (error) {
                console.log("Error parsing body:", error);
                return;
            }
        }
        console.log("body", body);
        console.log("typeof(body)", typeof (body));
        const sender = await this.getUserFromSocket(socket);
        if (!sender) {
            socket.emit('error', { message: 'Unauthorized' });
            return;
        }
        const { receiverId, message } = body;
        const savedMessage = await this.chatService.saveMessage({
            senderId: sender.userId,
            receiverId,
            content: message,
            timestamp: new Date(),
        });
        const recipientSocket = this.clients.get(receiverId);
        if (recipientSocket) {
            this.server.to(recipientSocket.id).emit('receiveMessage', {
                senderId: sender.userId,
                message,
                timestamp: savedMessage.timestamp,
            });
            console.log(`Message sent to user ${receiverId}`);
        }
        else {
            console.log(`User ${receiverId} not connected. Message saved to database.`);
        }
    }
    async handleGetChatHistory(socket, body) {
        const sender = await this.getUserFromSocket(socket);
        if (!sender) {
            socket.emit('error', { message: 'Unauthorized' });
            return;
        }
        const { receiverId } = body;
        const messages = await this.chatService.getMessagesBetweenUsers(sender.userId, receiverId);
        socket.emit('chatHistory', messages);
    }
    async handleGetAllConversations(socket) {
        const sender = await this.getUserFromSocket(socket);
        if (!sender) {
            socket.emit('error', { message: 'Unauthorized' });
            return;
        }
        try {
            const conversations = await this.chatService.getAllConversationsForUser(sender.userId);
            console.log("conversations", conversations);
            socket.emit('conversationsList', conversations);
        }
        catch (error) {
            console.error('Error fetching conversations:', error);
            socket.emit('error', { message: 'Failed to fetch conversations' });
        }
    }
};
exports.MyGateway = MyGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MyGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('bookingStatusUpdated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, create_socket_dto_1.CreateSocketDto]),
    __metadata("design:returntype", Promise)
], MyGateway.prototype, "handleBookingStatusUpdated", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getUserMessages'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MyGateway.prototype, "handleGetUserMessages", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], MyGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getChatHistory'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], MyGateway.prototype, "handleGetChatHistory", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getAllConversations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MyGateway.prototype, "handleGetAllConversations", null);
exports.MyGateway = MyGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        port: 1234,
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        socket_service_1.SocketService,
        chat_service_1.ChatService])
], MyGateway);
//# sourceMappingURL=gateway.js.map