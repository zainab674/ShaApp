import { ApiProperty } from '@nestjs/swagger';

export class AddMessageDto {
    @ApiProperty({ description: 'Sender of the message (e.g., user or bot)' })
    sender: string;

    @ApiProperty({ description: 'Message content' })
    message: string;

    @ApiProperty({ description: 'Unique identifier of the user', required: true })
    userId: string;
}

export class ChatMessage {
    @ApiProperty({ description: 'Sender of the message' })
    sender: string;

    @ApiProperty({ description: 'Message content' })
    message: string;

    @ApiProperty({ description: 'Timestamp of the message' })
    timestamp: Date;

    @ApiProperty({ description: 'Unique identifier of the user' })
    userId: string;
}
