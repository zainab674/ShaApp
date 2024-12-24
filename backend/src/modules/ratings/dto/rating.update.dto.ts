import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { IsString, MinLength } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';



export class UpdateRatingDto {


    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "Comment of Rating",
        title: "Comment",
    })
    @Prop({ type: "string", required: true, trim: true })
    comment: string;



    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: " Rating",
        title: "Rating",
    })
    @Prop({ type: "number", required: true, trim: true })
    rating: number;






}