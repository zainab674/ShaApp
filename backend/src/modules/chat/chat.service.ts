import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ChatDocument, ChatEntity } from './chat.schema';

@Injectable()
export class ChatService {
    constructor(@InjectModel(ChatEntity.name) private chatModel: Model<ChatDocument>) { }

    // Fetch all messages for a specific session or user
    async getSenderMessages(senderId: string): Promise<any> {
        return this.chatModel.find({ senderId }).sort({ timestamp: 1 }).exec();
    }
    async getReceiverMessages(receiverId: string): Promise<any> {
        return this.chatModel.find({ receiverId }).sort({ timestamp: 1 }).exec();
    }

    // Save a user or bot message
    async addMessage(senderId: string, message: string, receiverId: string): Promise<any> {
        const newMessage = new this.chatModel({ senderId, message, receiverId });
        return newMessage.save();
    }

    async saveMessage(data: Partial<ChatEntity>) {
        return await this.chatModel.create(data);
    }

    async getMessagesBetweenUsers(userId1: string, userId2: string) {
        return this.chatModel
            .find({
                $or: [
                    { senderId: userId1, receiverId: userId2 },
                    { senderId: userId2, receiverId: userId1 },
                ],
            })
            .sort({ timestamp: 1 });
    }



    // async getAllConversationsForUser(userId: string) {
    //     const totalMessages = await this.chatModel.countDocuments();
    //     console.log('Total messages in database:', totalMessages);

    //     // Log messages matching the user
    //     const userMessages = await this.chatModel.find({
    //         $or: [
    //             { senderId: userId },
    //             { receiverId: userId }
    //         ]
    //     });
    //     console.log('User messages:', userMessages);
    //     try {
    //         const conversations = await this.chatModel.aggregate([
    //             {
    //                 $match: {
    //                     $or: [
    //                         { senderId: userId },
    //                         { receiverId: userId }
    //                     ]
    //                 }
    //             },
    //             {
    //                 $group: {
    //                     _id: {
    //                         $cond: [
    //                             { $eq: ['$senderId', userId] },
    //                             '$receiverId',
    //                             '$senderId'
    //                         ]
    //                     },
    //                     lastMessage: { $last: '$message' },
    //                     timestamp: { $last: '$timestamp' },
    //                     count: { $sum: 1 }
    //                 }
    //             },
    //             {
    //                 $project: {
    //                     userId: '$_id',
    //                     lastMessage: 1,
    //                     timestamp: 1,
    //                     count: 1,
    //                     _id: 0
    //                 }
    //             },
    //             {
    //                 $sort: { timestamp: -1 }
    //             }
    //         ]);

    //         console.log('Conversations found:', conversations);
    //         console.log('userId used:', userId);

    //         return conversations;
    //     } catch (error) {
    //         console.error('Error in getAllConversationsForUser:', error);
    //         throw error;
    //     }
    // }


    async getAllConversationsForUser(userId: string) {
        try {
            const conversations = await this.chatModel.aggregate([
                {
                    $match: {
                        $or: [
                            { senderId: new mongoose.Types.ObjectId(userId) },
                            { receiverId: new mongoose.Types.ObjectId(userId) }
                        ]
                    }
                },
                {
                    $group: {
                        _id: {
                            $cond: [
                                { $eq: ['$senderId', new mongoose.Types.ObjectId(userId)] },
                                '$receiverId',
                                '$senderId'
                            ]
                        },
                        lastMessage: { $last: '$content' },
                        timestamp: { $last: '$timestamp' }
                    }
                },
                {
                    $project: {
                        userId: { $toString: '$_id' },
                        lastMessage: 1,
                        timestamp: 1,
                        _id: 0
                    }
                },
                {
                    $sort: { timestamp: -1 }
                }
            ]);

            return conversations;
        } catch (error) {
            console.error('Error in getAllConversationsForUser:', error);
            throw error;
        }
    }

}
