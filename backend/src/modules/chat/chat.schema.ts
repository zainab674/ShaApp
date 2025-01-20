import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
    @Prop()
    sender: string; // 'user' or 'bot'

    @Prop()
    message: string;

    @Prop()
    userId: string; // Add this property to align with ChatMessage DTO

    @Prop({ default: Date.now })
    timestamp: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
