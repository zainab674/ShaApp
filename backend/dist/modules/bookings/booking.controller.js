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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../constants");
const booking_service_1 = require("./booking.service");
const booking_schema_1 = require("./schema/booking.schema");
const userRoles_1 = require("../../casl/userRoles");
const decorators_1 = require("../../decorators");
const user_schema_1 = require("../user/user.schema");
const booking_update_dto_1 = require("./dto/booking-update.dto");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async create(user, createDto) {
        createDto.userId = user.id;
        return this.bookingService.create(createDto);
    }
    findall(page = 1, limit = 20) {
        return this.bookingService.findall(page, limit);
    }
    async update(id, updateDatato) {
        console.log(updateDatato);
        return this.bookingService.update(id, updateDatato);
    }
    async deleteService(id) {
        return this.bookingService.delete(id);
    }
    async findBooking(id) {
        return this.bookingService.find(id);
    }
    async findBookingOfUser(user) {
        const id = user.id;
        return this.bookingService.findByUserId(id);
    }
    async findBookingOfService(id) {
        return this.bookingService.findByServiceId(id);
    }
    async CheckBooking(user, id) {
        const userId = user.id;
        console.log(id, userId);
        return this.bookingService.findByServiceAndUserId(id, userId);
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Create Booking",
        type: booking_schema_1.BookingEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Booking"),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, booking_schema_1.BookingEntity]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get all List",
        type: booking_schema_1.BookingEntity,
    }),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findall", null);
__decorate([
    (0, common_1.Patch)(constants_1.constTexts.bookingRoute.update),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Update Booking",
        type: booking_schema_1.BookingEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Update, "Booking"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, booking_update_dto_1.UpdateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(constants_1.constTexts.bookingRoute.delete),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Delete Booking",
        type: booking_schema_1.BookingEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Update, "Booking"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "deleteService", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.bookingRoute.details),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get Booking",
        type: booking_schema_1.BookingEntity,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findBooking", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.bookingRoute.getUserBookings),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get Booking of User",
        type: booking_schema_1.BookingEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Update, "Booking"),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findBookingOfUser", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.bookingRoute.getServiceBookings),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get Booking of Service",
        type: booking_schema_1.BookingEntity,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findBookingOfService", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.bookingRoute.checkBooking),
    (0, decorators_1.ApiPageOkResponse)({
        description: 'Check if there is a  booking for the given service and user.',
        type: booking_schema_1.BookingEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Update, "Booking"),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "CheckBooking", null);
exports.BookingController = BookingController = __decorate([
    (0, common_1.Controller)(constants_1.constTexts.bookingRoute.name),
    (0, swagger_1.ApiTags)(constants_1.constTexts.bookingRoute.name),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map