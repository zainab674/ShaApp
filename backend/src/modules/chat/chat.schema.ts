import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

import {

    validationMetadatasToSchemas,
} from "class-validator-jsonschema";
import mongoose, { Document } from "mongoose";


export type ChatDocument = ChatEntity & Document;
@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true,
})
export class ChatEntity {
    id: string;


    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    senderId: string;

    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    receiverId: string;

    @ApiProperty()
    @Prop({ type: String })
    content: string;

    @Prop({ default: Date.now })
    timestamp: Date;


}

const ChatSchema = SchemaFactory.createForClass(ChatEntity);
ChatSchema.index({ location: "2dsphere" });

// Hooks
ChatSchema.virtual("id").get(function (this: ChatDocument) {
    return this._id.toString();
});
export { ChatSchema };
export const userJsonSchema = validationMetadatasToSchemas();
//console.log('schemas=>', JSON.stringify(userJsonSchema)); logger , exclude fileds, test cases
