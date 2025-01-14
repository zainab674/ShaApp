import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,

    IsString,
    MinLength,
} from "class-validator";
import {

    validationMetadatasToSchemas,
} from "class-validator-jsonschema";

import mongoose, { Document } from 'mongoose';



export type SocketDocument = Socket & Document;
@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true,
})
export class Socket {
    id: string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "UserId ",
    })
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Ensure this matches your User model's name
    })
    userId: string;



    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "bookingId ",
    })
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookingEntity', // Ensure this matches your BookingEntity model's name
    })
    bookingId: string;

    @IsNotEmpty()
    @IsString()

    @ApiProperty({
        description: "Status",
    })
    @Prop({ type: "string" })
    status: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @ApiProperty({
        description: "Message",
    })
    @Prop({ type: "string" })
    message: string;









}





const SocketSchema = SchemaFactory.createForClass(Socket);
SocketSchema.index({ SocketName: "text" });


SocketSchema.virtual("id").get(function (this: SocketDocument) {
    return this._id.toString();
});
export { SocketSchema };
export const SocketJsonSchema = validationMetadatasToSchemas();
