import { ChatService } from './chat.service';
import { AddMessageDto, ChatMessage } from './chat.dto';
import { User } from '../user/user.schema';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getMessages(user: User): Promise<ChatMessage[]>;
    addMessage(user: User, body: AddMessageDto): Promise<{
        userMessage: string;
        botResponse: string;
    }>;
}
