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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../constants");
const userRoles_1 = require("../../casl/userRoles");
const decorators_1 = require("../../decorators");
const user_schema_1 = require("../user/user.schema");
const rating_service_1 = require("./rating.service");
const rating_schema_1 = require("./schema/rating.schema");
const rating_update_dto_1 = require("./dto/rating.update.dto");
let RatingController = class RatingController {
    constructor(ratingService) {
        this.ratingService = ratingService;
    }
    async create(user, createDto) {
        createDto.userId = user.id;
        return this.ratingService.create(createDto);
    }
    findall(page = 1, limit = 20) {
        return this.ratingService.findall(page, limit);
    }
    async update(id, updateDatato) {
        return this.ratingService.update(id, updateDatato);
    }
    async deleteService(id) {
        return this.ratingService.delete(id);
    }
    async findRating(id) {
        return this.ratingService.find(id);
    }
    async findRatingOfUser(user) {
        const id = user.id;
        return this.ratingService.findByUserId(id);
    }
    async findRatingOfService(id) {
        return this.ratingService.findByServiceId(id);
    }
};
exports.RatingController = RatingController;
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Create Rating",
        type: rating_schema_1.RatingEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Rating"),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, rating_schema_1.RatingEntity]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get all List",
        type: rating_schema_1.RatingEntity,
    }),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "findall", null);
__decorate([
    (0, common_1.Patch)(constants_1.constTexts.ratingRoute.update),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Update Service",
        type: rating_schema_1.RatingEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Update, "Rating"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, rating_update_dto_1.UpdateRatingDto]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(constants_1.constTexts.ratingRoute.delete),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Delete Rating",
        type: rating_schema_1.RatingEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Update, "Rating"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "deleteService", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.ratingRoute.details),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get Rating",
        type: rating_schema_1.RatingEntity,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "findRating", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.ratingRoute.user),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get Rating of User",
        type: rating_schema_1.RatingEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Rating"),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "findRatingOfUser", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.ratingRoute.getServiceRatings),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get Rating of Service",
        type: rating_schema_1.RatingEntity,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "findRatingOfService", null);
exports.RatingController = RatingController = __decorate([
    (0, common_1.Controller)(constants_1.constTexts.ratingRoute.name),
    (0, swagger_1.ApiTags)(constants_1.constTexts.ratingRoute.name),
    __metadata("design:paramtypes", [rating_service_1.RatingService])
], RatingController);
//# sourceMappingURL=rating.controller.js.map