import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { SocketService } from './socket.service';
import { CreateSocketDto } from './dto/create-socket.dto';
import { ChatService } from '../chat/chat.service';
export declare class MyGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private authService;
    private socketService;
    private chatService;
    constructor(authService: AuthService, socketService: SocketService, chatService: ChatService);
    server: Server;
    private clients;
    private getUserFromSocket;
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(socket: Socket): void;
    handleBookingStatusUpdated(socket: Socket, createSocketDto: CreateSocketDto): Promise<void>;
    handleGetUserMessages(socket: Socket): Promise<void>;
    handleSendMessage(socket: Socket, body: {
        receiverId: string;
        message: string;
    }): Promise<void>;
    handleGetChatHistory(socket: Socket, body: {
        receiverId: string;
    }): Promise<void>;
    handleGetAllConversations(socket: Socket): Promise<void>;
    s: any;
}
