import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatEntity, ChatSchema } from './chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ChatEntity.name, schema: ChatSchema }]),

  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule { }
