import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {
    IsBoolean,
    IsDate,
    IsEnum,
    IsOptional,
    IsString,
    MinLength,

} from "class-validator";
import {
    JSONSchema,
    validationMetadatasToSchemas,
} from "class-validator-jsonschema";
import mongoose, { Document } from "mongoose";

import { Transform } from "class-transformer";
import { BookingStatus } from "src/constants";

export type BookingDocument = BookingEntity & Document;
@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true,
})
export class BookingEntity {
    id: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "title of the booking",
        title: "title",
    })
    @Prop({ type: "string", required: true, trim: true })
    title: string;


    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "Description of Booking",
        title: "Description",
    })
    @Prop({ type: "string", required: true, trim: true })
    description: string;



    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "Price of Booking",
        title: "Price",
    })
    @Prop({ type: "string", required: true, trim: true })
    price: string;


    @ApiProperty()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    @JSONSchema({
        description: " Start Date of booking",
        title: "Date",
    })
    @Prop({
        type: Date,
        required: true,
        trim: true,
        lowercase: true,
        default: "",
    })
    startDate: Date;



    @ApiProperty()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    @JSONSchema({
        description: " End Date of booking",
        title: "Date",
    })
    @Prop({
        type: Date,
        required: true,
        trim: true,
        lowercase: true,
        default: "",
    })
    endDate: Date;



    @IsEnum(BookingStatus)
    @IsString()
    @ApiProperty()
    @IsOptional()
    @JSONSchema({
        description: "Status of booking",
        title: "Status of booking ",
    })
    @Prop({ type: "string", trim: true, required: true, default: "pending" })
    status: string;

    @IsBoolean()
    @IsString()
    @ApiProperty()
    @IsOptional()
    @JSONSchema({
        description: "Payment of booking",
        title: "payment of booking ",
    })
    @Prop({ type: Boolean, trim: true, required: true, default: "false" })
    isPaid: Boolean;



    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    userId: string;

    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "ServiceEntity" })
    serviceId: string;
}

const BookingSchema = SchemaFactory.createForClass(BookingEntity);
BookingSchema.index({ location: "2dsphere" });

// Hooks
BookingSchema.virtual("id").get(function (this: BookingDocument) {
    return this._id.toString();
});
export { BookingSchema };
export const userJsonSchema = validationMetadatasToSchemas();
//console.log('schemas=>', JSON.stringify(userJsonSchema)); logger , exclude fileds, test cases
