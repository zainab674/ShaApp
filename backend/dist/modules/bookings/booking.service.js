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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const booking_schema_1 = require("./schema/booking.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const exceptions_1 = require("../../exceptions");
let BookingService = class BookingService {
    constructor(schemaModel) {
        this.schemaModel = schemaModel;
    }
    async create(createDto) {
        const create = new this.schemaModel(createDto);
        return await create.save().catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
    }
    async findall(page = 1, limit = 20) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalCount = await this.schemaModel.find().exec();
        const totalPages = Math.ceil(totalCount.length / limit);
        const data = await this.schemaModel
            .aggregate([
            {
                $skip: startIndex,
            },
            {
                $limit: endIndex,
            },
        ])
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        return {
            totalCount: totalCount.length,
            totalPages: totalPages,
            data: data,
        };
    }
    async update(id, updateDataDto) {
        const updateData = await this.schemaModel
            .findByIdAndUpdate(id, updateDataDto, { new: true })
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        return { data: updateData };
    }
    async delete(id) {
        return await this.schemaModel
            .findByIdAndDelete(id)
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
    }
    async findByUserId(id) {
        return await this.schemaModel
            .find({ userId: id })
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
    }
    async findByServiceId(id) {
        return await this.schemaModel
            .find({ serviceId: id })
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
    }
    async findByServiceAndUserId(serviceId, userId) {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const booking = await this.schemaModel.findOne({
                serviceId,
                userId,
                startDate: {
                    $gte: today
                },
                status: { $ne: 'rejected' }
            });
            if (booking) {
                console.log("booking", booking);
                return booking;
            }
            return null;
        }
        catch (err) {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        }
    }
    async find(id) {
        return await this.schemaModel
            .findById(id)
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_schema_1.BookingEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BookingService);
//# sourceMappingURL=booking.service.js.map