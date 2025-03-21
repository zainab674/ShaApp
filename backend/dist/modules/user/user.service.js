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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const utils_1 = require("../../common/utils");
const exceptions_1 = require("../../exceptions");
const user_schema_1 = require("./user.schema");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async logout(userId) {
        return await this.userModel
            .findByIdAndUpdate(userId, { tokens: [] })
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
    }
    async getSchema() {
        return await user_schema_1.userJsonSchema.Category;
    }
    async getOne(id) {
        const data = await this.userModel.findById({ _id: id }).catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        (data.password = "");
        return data;
    }
    async find(id) {
        return await this.userModel
            .findById(id)
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
    }
    async findOne(findData) {
        const user = await this.userModel.findOne(findData).catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        return user;
    }
    async findByEmail(options) {
        const user = await this.userModel
            .findOne({ email: options.email })
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        return user;
    }
    async generateString(length) {
        let result = "";
        const characters = (0, utils_1.getCharacterString)();
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    async createUser(userRegisterDto) {
        const createdUser = await new this.userModel(userRegisterDto)
            .save()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        return createdUser;
    }
    async getUsers(pageOptionsDto) {
        const queryBuilder = await this.userModel
            .aggregate([
            {
                $facet: {
                    metadata: [{ $count: "total" }],
                    data: [
                        { $sort: { [pageOptionsDto.column]: pageOptionsDto.order } },
                        { $skip: pageOptionsDto.skip },
                        { $limit: pageOptionsDto.take },
                    ],
                },
            },
            {
                $project: {
                    data: 1,
                    total: { $arrayElemAt: ["$metadata.total", 0] },
                },
            },
        ])
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        return queryBuilder;
    }
    async update(userId, userUpdateDto) {
        const returnObj = await this.userModel
            .findByIdAndUpdate(userId, userUpdateDto, { new: true })
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        return { data: returnObj };
    }
    async getProfileData(userId) {
        const data = await this.userModel
            .findById(userId)
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        data.password = "";
        return data;
    }
    async delete(userId) {
        return await this.userModel
            .findByIdAndDelete(userId)
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
    }
    async findall(page = 1, limit = 20) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalCount = await this.userModel.find().exec();
        const totalPages = Math.ceil(totalCount.length / limit);
        const data = await this.userModel
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map