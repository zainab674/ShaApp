import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { AddMessageDto, ChatMessage } from './chat.dto';
import { Auth, AuthUser } from 'src/decorators';
import { Action } from 'src/casl/userRoles';
import { User } from '../user/user.schema';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @ApiOperation({ summary: 'Get all chat messages for a user' })
    @ApiResponse({
        status: 200,
        description: 'List of all messages for the specified user',
        type: [ChatMessage],
    })
    @Get()
    @Auth(Action.Update, "Chat")
    async getMessages(@AuthUser() user: User,): Promise<ChatMessage[]> {
        const userId = user.id;
        return this.chatService.getAllMessages(userId);
    }

    @ApiOperation({ summary: 'Add a new message and get bot response if sender is user' })
    @ApiBody({ type: AddMessageDto })
    @ApiResponse({ status: 201, description: 'Message added successfully with bot response if applicable' })
    @Post()
    @Auth(Action.Update, "Chat")
    async addMessage(@AuthUser() user: User, @Body() body: AddMessageDto) {
        const { sender, message } = body;
        const userId = user.id;

        // Add the user message to the database
        await this.chatService.addMessage(sender, message, userId);

        // Check if the sender is a user and generate bot response

        const botResponse = await this.chatService.getBotResponse(message, userId);

        // Return both the user's message and the bot's response
        return {
            userMessage: message,
            botResponse,
        };

    }
}
