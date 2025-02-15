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
exports.userJsonSchema = exports.BookingSchema = exports.BookingEntity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const mongoose_2 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const constants_1 = require("../../../constants");
let BookingEntity = class BookingEntity {
};
exports.BookingEntity = BookingEntity;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "title of the booking",
        title: "title",
    }),
    (0, mongoose_1.Prop)({ type: "string", required: true, trim: true }),
    __metadata("design:type", String)
], BookingEntity.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Description of Booking",
        title: "Description",
    }),
    (0, mongoose_1.Prop)({ type: "string", required: true, trim: true }),
    __metadata("design:type", String)
], BookingEntity.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Price of Booking",
        title: "Price",
    }),
    (0, mongoose_1.Prop)({ type: "string", required: true, trim: true }),
    __metadata("design:type", String)
], BookingEntity.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: " Start Date of booking",
        title: "Date",
    }),
    (0, mongoose_1.Prop)({
        type: Date,
        required: true,
        trim: true,
        lowercase: true,
        default: "",
    }),
    __metadata("design:type", Date)
], BookingEntity.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: " End Date of booking",
        title: "Date",
    }),
    (0, mongoose_1.Prop)({
        type: Date,
        required: true,
        trim: true,
        lowercase: true,
        default: "",
    }),
    __metadata("design:type", Date)
], BookingEntity.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(constants_1.BookingStatus),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Status of booking",
        title: "Status of booking ",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, required: true, default: "pending" }),
    __metadata("design:type", String)
], BookingEntity.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Payment of booking",
        title: "payment of booking ",
    }),
    (0, mongoose_1.Prop)({ type: Boolean, trim: true, required: true, default: "false" }),
    __metadata("design:type", Boolean)
], BookingEntity.prototype, "isPaid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "User" }),
    __metadata("design:type", String)
], BookingEntity.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "ServiceEntity" }),
    __metadata("design:type", String)
], BookingEntity.prototype, "serviceId", void 0);
exports.BookingEntity = BookingEntity = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            getters: true,
            virtuals: true,
        },
        timestamps: true,
    })
], BookingEntity);
const BookingSchema = mongoose_1.SchemaFactory.createForClass(BookingEntity);
exports.BookingSchema = BookingSchema;
BookingSchema.index({ location: "2dsphere" });
BookingSchema.virtual("id").get(function () {
    return this._id.toString();
});
exports.userJsonSchema = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)();
//# sourceMappingURL=booking.schema.js.map