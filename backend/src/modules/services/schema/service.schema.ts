import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {
    IsEnum,
    IsOptional,
    IsString,
    MinLength,
    // ValidateNested,
} from "class-validator";
import {
    JSONSchema,
    validationMetadatasToSchemas,
} from "class-validator-jsonschema";
import mongoose, { Document } from "mongoose";
import { ServiceCategory } from "src/constants";

export type ServiceDocument = ServiceEntity & Document;
@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true,
})
export class ServiceEntity {
    id: string;

    @IsString()
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
    @ApiProperty()
    @JSONSchema({
        description: "Category of Service",
        title: "Category",
    })
    @Prop({ type: "string", required: false, trim: true })
    category: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "Price of Service",
        title: "Price",
    })
    @Prop({ type: "string", required: true, trim: true })
    price: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "Country of Service",
        title: "Country",
    })
    @Prop({ type: "string", required: true, trim: true })
    country: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "city of Service",
        title: "city",
    })
    @Prop({ type: "string", required: true, trim: true })
    city: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "zipcode of Service",
        title: "zipcode",
    })
    @Prop({ type: "string", required: true, trim: true })
    zipcode: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "address of Service",
        title: "address",
    })
    @Prop({ type: "string", required: true, trim: true })
    address: string;


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


    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    userId: string;
}

const ServiceSchema = SchemaFactory.createForClass(ServiceEntity);
ServiceSchema.index({ location: "2dsphere" });

// Hooks
ServiceSchema.virtual("id").get(function (this: ServiceDocument) {
    return this._id.toString();
});
export { ServiceSchema };
export const userJsonSchema = validationMetadatasToSchemas();
//console.log('schemas=>', JSON.stringify(userJsonSchema)); logger , exclude fileds, test cases
