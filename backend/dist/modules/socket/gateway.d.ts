import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { SocketService } from './socket.service';
import { CreateSocketDto } from './dto/create-socket.dto';
export declare class MyGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private authService;
    private socketService;
    constructor(authService: AuthService, socketService: SocketService);
    server: Server;
    private clients;
    private getUserFromSocket;
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(socket: Socket): void;
    handleBookingStatusUpdated(socket: Socket, createSocketDto: CreateSocketDto): Promise<void>;
    handleGetUserMessages(socket: Socket): Promise<void>;
}
