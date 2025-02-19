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
exports.ServiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../constants");
const services_service_1 = require("./services.service");
const service_schema_1 = require("./schema/service.schema");
const userRoles_1 = require("../../casl/userRoles");
const decorators_1 = require("../../decorators");
const user_schema_1 = require("../user/user.schema");
const service_update_dto_1 = require("./dto/service-update.dto");
const filter_service_dto_1 = require("./dto/filter.service.dto");
const location_dto_1 = require("./dto/location.dto");
const search_dto_1 = require("./dto/search.dto");
const multi_upload_interceptor_1 = require("../../interceptors/multi-upload.interceptor");
let ServiceController = class ServiceController {
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    async create(user, image, createDto) {
        createDto.userId = user.id;
        if (image) {
            createDto.image = image.map((file) => file.filename);
        }
        return this.serviceService.create(createDto);
    }
    findall(page = 1, limit = 20) {
        return this.serviceService.findall(page, limit);
    }
    async update(id, image, updateDatato) {
        if (image) {
            updateDatato.image = image.map((file) => file.filename);
        }
        return this.serviceService.update(id, updateDatato);
    }
    async deleteService(id) {
        return this.serviceService.deleteService(id);
    }
    async getWithinRadius(locationDto) {
        return await this.serviceService.getWithinRadius(locationDto);
    }
    async searchByName(searchDto) {
        return await this.serviceService.searchByName(searchDto);
    }
    async searchByCategory(searchDto) {
        return await this.serviceService.searchByCategory(searchDto);
    }
    async filteredEvents(filterDto) {
        return await this.serviceService.filterEvents(filterDto);
    }
    async findBooking(id) {
        return this.serviceService.find(id);
    }
    async findBookingOfUser(id) {
        return this.serviceService.findByUserId(id);
    }
};
exports.ServiceController = ServiceController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, multi_upload_interceptor_1.MultipleFileUpload)("image", 5)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Create Service",
        type: service_schema_1.ServiceEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Service"),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, Array, service_schema_1.ServiceEntity]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get all List",
        type: service_schema_1.ServiceEntity,
    }),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "findall", null);
__decorate([
    (0, common_1.Patch)(constants_1.constTexts.serviceRoute.update),
    (0, common_1.UseInterceptors)((0, multi_upload_interceptor_1.MultipleFileUpload)("image", 5)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Update Service",
        type: service_schema_1.ServiceEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Update, "Service"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, service_update_dto_1.UpdateServiceDto]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(constants_1.constTexts.serviceRoute.delete),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Delete Service",
        type: service_schema_1.ServiceEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Update, "Service"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "deleteService", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)(constants_1.constTexts.serviceRoute.withinRadius),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: service_schema_1.ServiceEntity, description: " Fetched within radius" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_dto_1.LocationDto]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "getWithinRadius", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)(constants_1.constTexts.serviceRoute.searchByName),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: service_schema_1.ServiceEntity, description: " Searched By Name" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_dto_1.SearchDto]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "searchByName", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)(constants_1.constTexts.serviceRoute.searchByCategory),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: service_schema_1.ServiceEntity, description: "Searched By Category " }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_dto_1.SearchDto]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "searchByCategory", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)(constants_1.constTexts.serviceRoute.filter),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: service_schema_1.ServiceEntity, description: "Successfully Filtered" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_service_dto_1.FilterDto]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "filteredEvents", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.serviceRoute.specific),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get Service",
        type: service_schema_1.ServiceEntity,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "findBooking", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.serviceRoute.users),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get Service of User",
        type: service_schema_1.ServiceEntity,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "findBookingOfUser", null);
exports.ServiceController = ServiceController = __decorate([
    (0, common_1.Controller)(constants_1.constTexts.serviceRoute.name),
    (0, swagger_1.ApiTags)(constants_1.constTexts.serviceRoute.name),
    __metadata("design:paramtypes", [services_service_1.ServiceService])
], ServiceController);
//# sourceMappingURL=services.controller.js.map