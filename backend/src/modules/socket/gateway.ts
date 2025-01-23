import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { SocketService } from './socket.service';
import { CreateSocketDto } from './dto/create-socket.dto';
import { ChatService } from '../chat/chat.service';



@WebSocketGateway({
    port: 1234,
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    },
})
export class MyGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private authService: AuthService,
        private socketService: SocketService,
        private chatService: ChatService,
    ) { }

    @WebSocketServer()
    server: Server;

    private clients = new Map<string, Socket>();

    private async getUserFromSocket(socket: Socket) {
        const token = socket.handshake.headers.authorization;
        return (this.authService.getUserFromToken(token) || "");
    }

    async handleConnection(socket: Socket) {
        const token = socket.handshake.headers.authorization;
        const user = await this.authService.getUserFromToken(token);
        if (user) {
            this.clients.set(user.userId, socket);
            console.log("Client connected: ", user.userId);

            const messages = await this.socketService.getAll(user.userId);
            // console.log(messages);
            socket.emit('allMessages', messages);
        } else {
            socket.emit('error', { message: 'Unauthorized' });
            socket.disconnect();
        }
    }

    handleDisconnect(socket: Socket) {
        for (let [userId, clientSocket] of this.clients.entries()) {
            if (clientSocket.id === socket.id) {
                this.clients.delete(userId);
                console.log("Client disconnected:", userId);
                break;
            }
        }
    }

    @SubscribeMessage('bookingStatusUpdated')
    async handleBookingStatusUpdated(socket: Socket, createSocketDto: CreateSocketDto) {
        console.log("Event: bookingStatusUpdated triggered");

        if (typeof createSocketDto === 'string') {
            try {
                createSocketDto = JSON.parse(createSocketDto);
            } catch (error) {
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
        } else {
            console.log(`User ${userId} not connected.`);
        }
    }


    @SubscribeMessage('getUserMessages')
    async handleGetUserMessages(socket: Socket) {
        const user = await this.getUserFromSocket(socket);
        if (!user) {
            socket.emit('error', { message: 'Unauthorized' });
            return;
        }

        const messages = await this.socketService.getAll(user.userId);
        socket.emit('allMessages', messages);
    }

    @SubscribeMessage('sendMessage')
    async handleSendMessage(socket: Socket, body: { receiverId: string; message: string }) {
        console.log('sendMessage received:', body); // Debugging
        console.log("body", body)
        console.log("typeof(body)", typeof (body))
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body);
            } catch (error) {
                console.log("Error parsing body:", error);
                return;
            }
        }
        console.log("body", body)
        console.log("typeof(body)", typeof (body))
        const sender = await this.getUserFromSocket(socket);
        if (!sender) {
            socket.emit('error', { message: 'Unauthorized' });
            return;
        }

        const { receiverId, message } = body;

        // Save the message using ChatService
        const savedMessage = await this.chatService.saveMessage({
            senderId: sender.userId,
            receiverId,
            content: message,
            timestamp: new Date(),
        });

        // Send the message to the receiver if they're online
        const recipientSocket = this.clients.get(receiverId);
        if (recipientSocket) {
            this.server.to(recipientSocket.id).emit('receiveMessage', {
                senderId: sender.userId,
                message,
                timestamp: savedMessage.timestamp,
            });
            console.log(`Message sent to user ${receiverId}`);
        } else {
            console.log(`User ${receiverId} not connected. Message saved to database.`);
        }
    }

    @SubscribeMessage('getChatHistory')
    async handleGetChatHistory(socket: Socket, body: { receiverId: string }) {
        const sender = await this.getUserFromSocket(socket);
        if (!sender) {
            socket.emit('error', { message: 'Unauthorized' });
            return;
        }

        const { receiverId } = body;

        // Fetch chat history using ChatService
        const messages = await this.chatService.getMessagesBetweenUsers(sender.userId, receiverId);

        // Send the messages back to the client
        socket.emit('chatHistory', messages);
    }




    @SubscribeMessage('getAllConversations')
    async handleGetAllConversations(socket: Socket) {
        const sender = await this.getUserFromSocket(socket);
        if (!sender) {
            socket.emit('error', { message: 'Unauthorized' });
            return;
        }

        try {
            // Fetch all conversations for the current user
            const conversations = await this.chatService.getAllConversationsForUser(sender.userId);
            console.log("conversations", conversations)

            // Emit the conversations list back to the client
            socket.emit('conversationsList', conversations);
        } catch (error) {
            console.error('Error fetching conversations:', error);
            socket.emit('error', { message: 'Failed to fetch conversations' });
        }
    } s

}
