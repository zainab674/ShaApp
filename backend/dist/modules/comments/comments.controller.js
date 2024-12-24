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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
const swagger_1 = require("@nestjs/swagger");
const user_schema_1 = require("../user/user.schema");
const decorators_1 = require("../../decorators");
const userRoles_1 = require("../../casl/userRoles");
const comments_service_1 = require("./comments.service");
const comments_schema_1 = require("./schema/comments.schema");
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    async create(user, createDto) {
        createDto.userId = user.id;
        return this.commentsService.create(createDto, user);
    }
    findPostComment(id) {
        return this.commentsService.findPostComment(id);
    }
};
exports.CommentsController = CommentsController;
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Create Comment",
        type: comments_schema_1.Comments,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Comment"),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, comments_schema_1.Comments]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "create", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(constants_1.constTexts.commentRoute.post),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get all List",
        type: comments_schema_1.Comments,
    }),
    (0, swagger_1.ApiQuery)({ name: "id", required: true, type: String }),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "findPostComment", null);
exports.CommentsController = CommentsController = __decorate([
    (0, common_1.Controller)(constants_1.constTexts.commentRoute.name),
    (0, swagger_1.ApiTags)(constants_1.constTexts.commentRoute.name),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
//# sourceMappingURL=comments.controller.js.map