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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const constants_1 = require("../../constants");
const swagger_1 = require("@nestjs/swagger");
const post_schema_1 = require("./schema/post.schema");
const user_schema_1 = require("../user/user.schema");
const decorators_1 = require("../../decorators");
const userRoles_1 = require("../../casl/userRoles");
const posts_update_dto_1 = require("./dto/posts-update.dto");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async create(user, createDto) {
        createDto.userId = user.id;
        return this.postsService.create(createDto);
    }
    findall(page = 1, limit = 20) {
        return this.postsService.findall(page, limit);
    }
    async update(id, updateDatato) {
        return this.postsService.update(id, updateDatato);
    }
    async deletePost(id) {
        return this.postsService.deletePost(id);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Create Post",
        type: post_schema_1.PostEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Post"),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, post_schema_1.PostEntity]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get all List",
        type: post_schema_1.PostEntity,
    }),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findall", null);
__decorate([
    (0, common_1.Patch)(constants_1.constTexts.postRoute.update),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Update Post",
        type: post_schema_1.PostEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Update, "Post"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, posts_update_dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(constants_1.constTexts.postRoute.delete),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Update Post",
        type: post_schema_1.PostEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Update, "Post"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)(constants_1.constTexts.postRoute.name),
    (0, swagger_1.ApiTags)(constants_1.constTexts.postRoute.name),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map