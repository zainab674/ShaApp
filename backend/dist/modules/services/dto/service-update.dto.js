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
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "title of the Service",
        title: "title",
    }),
    (0, mongoose_1.Prop)({ type: "string", required: true, trim: true }),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Description of Service",
        title: "Description",
    }),
    (0, mongoose_1.Prop)({ type: "string", required: true, trim: true }),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(constants_1.ServiceCategory),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Category of Service",
        title: "Category",
    }),
    (0, mongoose_1.Prop)({ type: "string", required: false, trim: true }),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Price of Service",
        title: "Price",
    }),
    (0, mongoose_1.Prop)({ type: "string", required: true, trim: true }),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Images of Service",
        title: "Images",
        type: "array",
        items: {
            type: "string",
        },
    }),
    (0, mongoose_1.Prop)({ type: [{ type: String, trim: true }] }),
    __metadata("design:type", Array)
], UpdateServiceDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        properties: {
            coordinates: {
                type: 'array',
                items: { type: 'number' },
                example: [40.7128, -74.0060],
                description: 'Array of coordinates: [longitude, latitude]',
            },
        },
    }),
    (0, mongoose_1.Prop)({
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
    }),
    __metadata("design:type", Object)
], UpdateServiceDto.prototype, "location", void 0);
//# sourceMappingURL=service-update.dto.js.map