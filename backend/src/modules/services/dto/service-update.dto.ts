import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
// import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { ServiceCategory } from 'src/constants';

export class UpdateServiceDto {

    @IsString()
    @IsOptional()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "title of the Service",
        title: "title",
    })
    @Prop({ type: "string", required: true, trim: true })
    title: string;


    @IsString()
    @IsOptional()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "Description of Service",
        title: "Description",
    })
    @Prop({ type: "string", required: true, trim: true })
    description: string;

    @IsEnum(ServiceCategory)
    @IsOptional()
    @ApiProperty()
    @JSONSchema({
        description: "Category of Service",
        title: "Category",
    })
    @Prop({ type: "string", required: false, trim: true })
    category: string;

    @IsString()
    @IsOptional()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "Price of Service",
        title: "Price",
    })
    @Prop({ type: "string", required: true, trim: true })
    price: string;


    @IsOptional()
    @ApiProperty()
    @JSONSchema({
        description: "Images of Service",
        title: "Images",
        type: "array",
        items: {
            type: "string",
        },
    })
    @Prop({ type: [{ type: String, trim: true }] })
    image: string[];



    @IsOptional()
    @ApiProperty({
        // type: string,
        properties: {
            coordinates: {
                type: 'array',
                items: { type: 'number' },
                example: [40.7128, -74.0060],
                description: 'Array of coordinates: [longitude, latitude]',
            },
        },
    })
    @Prop({

        type: {
            type: String,
            enum: ['Point'],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: function (value) {
                    return value.length === 2;
                },
                message: 'Coordinates must be an array of two numbers [longitude, latitude]',
            },
        },


    })
    location: {
        // type: string,
        coordinates: [number, number];
        required: true;
    };



}