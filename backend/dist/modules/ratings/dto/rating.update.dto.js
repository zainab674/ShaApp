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
exports.UpdateRatingDto = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
class UpdateRatingDto {
}
exports.UpdateRatingDto = UpdateRatingDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Comment of Rating",
        title: "Comment",
    }),
    (0, mongoose_1.Prop)({ type: "string", required: true, trim: true }),
    __metadata("design:type", String)
], UpdateRatingDto.prototype, "comment", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: " Rating",
        title: "Rating",
    }),
    (0, mongoose_1.Prop)({ type: "number", required: true, trim: true }),
    __metadata("design:type", Number)
], UpdateRatingDto.prototype, "rating", void 0);
//# sourceMappingURL=rating.update.dto.js.map