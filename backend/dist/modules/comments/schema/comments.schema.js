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
exports.userJsonSchema = exports.CommentsSchema = exports.Comments = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../../constants");
let Comments = class Comments {
};
exports.Comments = Comments;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "body of the comment",
        title: "body",
    }),
    (0, mongoose_1.Prop)({ type: "string", required: true, trim: true }),
    __metadata("design:type", String)
], Comments.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "User" }),
    __metadata("design:type", String)
], Comments.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "PostEntity" }),
    __metadata("design:type", String)
], Comments.prototype, "postId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Comments" }),
    __metadata("design:type", String)
], Comments.prototype, "parentComment", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Comments" }] }),
    __metadata("design:type", Array)
], Comments.prototype, "replies", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(constants_1.CommentType),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Type of comment",
        title: "type",
    }),
    (0, mongoose_1.Prop)({
        type: "string",
        required: true,
        trim: true,
    }),
    __metadata("design:type", String)
], Comments.prototype, "type", void 0);
exports.Comments = Comments = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            getters: true,
            virtuals: true,
        },
        timestamps: true,
    })
], Comments);
const CommentsSchema = mongoose_1.SchemaFactory.createForClass(Comments);
exports.CommentsSchema = CommentsSchema;
CommentsSchema.virtual("id").get(function () {
    return this._id.toString();
});
exports.userJsonSchema = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)();
//# sourceMappingURL=comments.schema.js.map