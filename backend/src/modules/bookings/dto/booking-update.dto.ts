import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
// import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString, MinLength } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

import { Transform } from "class-transformer";

export class UpdateBookingDto {


    @IsOptional()
    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "title of the booking",
        title: "title",
    })
    @Prop({ type: "string", required: true, trim: true })
    title: string;


    @IsOptional()
    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "Description of Booking",
        title: "Description",
    })
    @Prop({ type: "string", required: true, trim: true })
    description: string;



    @IsOptional()
    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "Price of Booking",
        title: "Price",
    })
    @Prop({ type: "string", required: true, trim: true })
    price: string;



    @IsOptional()
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



    @IsOptional()
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




    @IsOptional()
    @IsString()
    @ApiProperty()
    @IsOptional()
    @JSONSchema({
        description: "Start time of booking",
        title: "Start Time",
    })
    @Prop({ type: "string", trim: true, required: true, default: "" })
    startTime: string;



    @IsOptional()
    @IsString()
    @ApiProperty()
    @IsOptional()
    @JSONSchema({
        description: "End time of booking",
        title: "End Time",
    })
    @Prop({ type: "string", trim: true, required: true, default: "" })
    endTime: string;


    @IsOptional()
    @IsString()
    @ApiProperty()
    @IsOptional()
    @JSONSchema({
        description: "Status of booking",
        title: "Status of booking ",
    })
    @Prop({ type: "string", trim: true, required: true, default: "pending" })
    status: string;





}