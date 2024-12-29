"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServiceDto = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const constants_1 = require("../../../constants");
class UpdateServiceDto {
}
exports.UpdateServiceDto = UpdateServiceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Title of the Service",
        title: "Title",
    }),
    (0, mongoose_1.Prop)({ type: "string", required: true, trim: true }),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Email of the Service",
        title: "Email",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true }),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Description of Service",
        title: "Description",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true }),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(constants_1.ServiceCategory),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Category of Service",
        title: "Category",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true }),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Price of Service",
        title: "Price",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true }),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Country of Service",
        title: "Country",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true }),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "City of Service",
        title: "City",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true }),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Zipcode of Service",
        title: "Zipcode",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true }),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "zipcode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Address of Service",
        title: "Address",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true }),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "Venue details", }),
    (0, mongoose_1.Prop)({
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
    }),
    __metadata("design:type", Object)
], UpdateServiceDto.prototype, "venueDetails", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "Catering details", }),
    (0, mongoose_1.Prop)({
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
    }),
    __metadata("design:type", Object)
], UpdateServiceDto.prototype, "cateringDetails", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "Photographer details", }),
    (0, mongoose_1.Prop)({
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
    }),
    __metadata("design:type", Object)
], UpdateServiceDto.prototype, "photographerDetails", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "Car rental details", }),
    (0, mongoose_1.Prop)({
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
    }),
    __metadata("design:type", Object)
], UpdateServiceDto.prototype, "carRentalDetails", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "Bridal makeup details", }),
    (0, mongoose_1.Prop)({
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
    }),
    __metadata("design:type", Object)
], UpdateServiceDto.prototype, "bridalMakeupDetails", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "Decor details", }),
    (0, mongoose_1.Prop)({
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
    }),
    __metadata("design:type", Object)
], UpdateServiceDto.prototype, "decorDetails", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "Henna artist details", }),
    (0, mongoose_1.Prop)({
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
    }),
    __metadata("design:type", Object)
], UpdateServiceDto.prototype, "hennaArtistDetails", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "Bridal wear details", }),
    (0, mongoose_1.Prop)({
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
    }),
    __metadata("design:type", Object)
], UpdateServiceDto.prototype, "bridalWearDetails", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "Invitation details", }),
    (0, mongoose_1.Prop)({
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
    }),
    __metadata("design:type", Object)
], UpdateServiceDto.prototype, "invitationsDetails", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "Singer details", }),
    (0, mongoose_1.Prop)({
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
    }),
    __metadata("design:type", Object)
], UpdateServiceDto.prototype, "singerDetails", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "Choreographer details", }),
    (0, mongoose_1.Prop)({
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
    }),
    __metadata("design:type", Object)
], UpdateServiceDto.prototype, "choreographerDetails", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Images of the service",
        type: "array",
        items: {
            type: "string",
            format: "binary",
        },
    }),
    (0, mongoose_1.Prop)({ type: "array" }),
    __metadata("design:type", Array)
], UpdateServiceDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        properties: {
            coordinates: {
                type: "array",
                items: { type: "number" },
                example: [40.7128, -74.0060],
                description: "Array of coordinates: [longitude, latitude]",
            },
        },
    }),
    (0, mongoose_1.Prop)({
        type: {
            type: String,
            enum: ["Point"],
            default: undefined,
        },
        coordinates: {
            type: [Number],
            default: undefined,
        },
    }),
    __metadata("design:type", Object)
], UpdateServiceDto.prototype, "location", void 0);
//# sourceMappingURL=service-update.dto.js.map