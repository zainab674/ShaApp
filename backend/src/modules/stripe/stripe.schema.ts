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



export type StripeDocument = Booking & Document;
@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true,
})
export class Booking {
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
        name: "name",
    })
    @Prop({ type: "string" })
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @ApiProperty({
        name: "price",
    })
    @Prop({ type: Number })
    price: Number;









}





const StripeSchema = SchemaFactory.createForClass(Booking);
StripeSchema.index({ StripeName: "text" });


StripeSchema.virtual("id").get(function (this: StripeDocument) {
    return this._id.toString();
});
export { StripeSchema };
export const StripeJsonSchema = validationMetadatasToSchemas();
