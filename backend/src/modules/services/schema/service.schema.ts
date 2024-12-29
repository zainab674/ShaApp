import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {
    IsEnum,
    IsOptional,
    IsString,
    MinLength,
    // IsNumber,
    // IsArray,
    // IsObject,
    IsEmail,
    // ValidateNested,
} from "class-validator";
import { JSONSchema, validationMetadatasToSchemas } from "class-validator-jsonschema";
import mongoose, { Document } from "mongoose";
// import { Type } from "class-transformer";
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
        description: "Title of the Service",
        title: "Title",
    })
    @Prop({ type: "string", required: true, trim: true })
    title: string;

    @IsOptional()
    @IsEmail()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "Email of the Service",
        title: "Email",
    })
    @Prop({ type: "string", trim: true })
    email: string;

    @IsString()
    @IsOptional()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "Description of Service",
        title: "Description",
    })
    @Prop({ type: "string", trim: true })
    description: string;

    @IsEnum(ServiceCategory)
    @ApiProperty()
    @JSONSchema({
        description: "Category of Service",
        title: "Category",
    })
    @Prop({ type: "string", trim: true })
    category: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "Price of Service",
        title: "Price",
    })
    @Prop({ type: "string", trim: true })
    price: string;

    // General Location Information
    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "Country of Service",
        title: "Country",
    })
    @Prop({ type: "string", trim: true })
    country: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "City of Service",
        title: "City",
    })
    @Prop({ type: "string", trim: true })
    city: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "Zipcode of Service",
        title: "Zipcode",
    })
    @Prop({ type: "string", trim: true })
    zipcode: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "Address of Service",
        title: "Address",
    })
    @Prop({ type: "string", trim: true })
    address: string;

    // Service-Specific Optional Fields
    @IsOptional()
    // @IsObject()
    @ApiProperty({ description: "Venue details", })
    @Prop({
        type: Object,
        required: false,
        default: {},
        properties: {
            capacity: {
                type: String,
                default: null
            },
            type: {
                type: String,
                default: null,
            },
            eventTypes: {
                type: [String],
                default: null,
            }
        }
    })
    venueDetails?: {
        capacity?: string;
        type?: string;
        eventTypes?: string[];
    };

    @IsOptional()
    // @IsObject()
    @ApiProperty({ description: "Catering details", })
    @Prop({
        type: Object,
        required: false,
        default: {},
        properties: {
            cuisineTypes: {
                type: [String],
                default: null
            },
            foodTastingAvailable: {
                type: Boolean,
                default: false,
            },
            serviceStyle: {
                type: String,
                default: null,
            }
        }
    })
    cateringDetails?: {
        cuisineTypes?: string[];
        foodTastingAvailable?: boolean;
        serviceStyle?: string;
    };

    @IsOptional()
    // @IsObject()
    @ApiProperty({ description: "Photographer details", })
    @Prop({
        type: Object,
        required: false,
        default: {},
        properties: {
            coverage: {
                type: String,
                default: null
            },
            deliveryTime: {
                type: String,
                default: null,
            },
            equipmentDetails: {
                type: [String],
                default: null,
            }
        }
    })
    photographerDetails?: {

        coverage?: string;
        deliveryTime?: string;
        equipmentDetails?: string[];
    };

    @IsOptional()
    // @IsObject()
    @ApiProperty({ description: "Car rental details", })
    @Prop({
        type: Object,
        required: false,
        default: {},
        properties: {
            vehicleOptions: {
                type: [String],
                default: null
            },
            rentalDuration: {
                type: String,
                default: null,
            },
            driverAvailability: {
                type: Boolean,
                default: false,
            },
        }
    })
    carRentalDetails?: {
        vehicleOptions?: string[];
        rentalDuration?: string;
        driverAvailability?: boolean;
    };

    @IsOptional()
    // @IsObject()
    @ApiProperty({ description: "Bridal makeup details", })
    @Prop({
        type: Object,
        required: false,
        default: {},
        properties: {
            makeupStyles: {
                type: [String],
                default: null
            },
            brandsUsed: {
                type: [String],
                default: null
            },
            trialSessionsAvailable: {
                type: Boolean,
                default: false,
            },
            additionalServices: {
                type: [String],
                default: null
            },
        }
    })
    bridalMakeupDetails?: {
        makeupStyles?: string[];
        brandsUsed?: string[];
        trialSessionsAvailable?: boolean;
        additionalServices?: string[];
    };

    @IsOptional()
    // @IsObject()
    @ApiProperty({ description: "Decor details", })
    @Prop({
        type: Object,
        required: false,
        default: {},
        properties: {
            themeOptions: {
                type: [String],
                default: null
            },
            setupTime: {
                type: String,
                default: null,
            },
            customizationAvailable: {
                type: Boolean,
                default: false,
            },
        }
    })
    decorDetails?: {
        themeOptions?: string[];
        setupTime?: string;
        customizationAvailable?: boolean;
    };

    @IsOptional()
    // @IsObject()
    @ApiProperty({ description: "Henna artist details", })
    @Prop({
        type: Object,
        required: false,
        default: {},
        properties: {
            designTypes: {
                type: [String],
                default: null
            },
            materialsUsed: {
                type: String,
                default: null,
            },
            teamAvailability: {
                type: Boolean,
                default: false,
            },
        }
    })
    hennaArtistDetails?: {
        designTypes?: string[];
        materialsUsed?: string;
        teamAvailability?: boolean;
    };

    @IsOptional()
    // @IsObject()
    @ApiProperty({ description: "Bridal wear details", })
    @Prop({
        type: Object,
        required: false,
        default: {},
        properties: {
            collectionDetails: {
                type: [String],
                default: null
            },
            fittingsAvailable: {
                type: Boolean,
                default: false,
            },
            deliveryTime: {
                type: String,
                default: null,
            },
        }
    })
    bridalWearDetails?: {
        collectionDetails?: string[];
        fittingsAvailable?: boolean;
        deliveryTime?: string;
    };

    @IsOptional()
    // @IsObject()
    @ApiProperty({ description: "Invitation details", })
    @Prop({
        type: Object,
        required: false,
        default: {},
        properties: {
            designOptions: {
                type: [String],
                default: null
            },
            customizationAvailable: {
                type: Boolean,
                default: false,
            },
            deliveryOptions: {
                type: [String],
                default: null
            },
        }
    })
    invitationsDetails?: {
        designOptions?: string[];
        customizationAvailable?: boolean;
        deliveryOptions?: string[];
    };

    @IsOptional()
    // @IsObject()
    @ApiProperty({ description: "Singer details", })
    @Prop({
        type: Object,
        required: false,
        default: {},
        properties: {
            performanceStyle: {
                type: String,
                default: null,
            },
            repertoire: {
                type: [String],
                default: null
            },
            duration: {
                type: String,
                default: null,
            },
        }
    })
    singerDetails?: {
        performanceStyle?: string;
        repertoire?: string[];
        duration?: string;
    };

    @IsOptional()
    // @IsObject()
    @ApiProperty({ description: "Choreographer details", })
    @Prop({
        type: Object,
        required: false,
        default: {},
        properties: {
            danceStyles: {
                type: [String],
                default: null
            },
            groupSize: {
                type: String,
                default: null,
            },
            sessionsOffered: {
                type: String,
                default: null,
            },
        }
    })
    choreographerDetails?: {
        danceStyles?: string[];
        groupSize?: string;
        sessionsOffered?: string;
    };

    @IsOptional()
    @ApiProperty({
        description: "Images of the service",
        type: "array",
        items: {
            type: "string",
            format: "binary",
        },
    })
    @Prop({ type: "array" })
    image?: string[];

    @IsOptional()
    @ApiProperty({
        properties: {
            coordinates: {
                type: "array",
                items: { type: "number" },
                example: [40.7128, -74.0060],
                description: "Array of coordinates: [longitude, latitude]",
            },
        },
    })
    @Prop({
        type: {
            type: String,
            enum: ["Point"],
            default: undefined,
        },
        coordinates: {
            type: [Number],
            default: undefined,
        },
    })
    location?: {
        type: string;
        coordinates: [number, number];
    };

    @IsOptional()
    @ApiProperty({
        description: "The ID of the user associated with the service",
    })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: false })
    userId?: string;
}

const ServiceSchema = SchemaFactory.createForClass(ServiceEntity);
ServiceSchema.index({ location: "2dsphere" });

// Hooks
ServiceSchema.virtual("id").get(function (this: ServiceDocument) {
    return this._id.toString();
});

export { ServiceSchema };
export const userJsonSchema = validationMetadatasToSchemas();
