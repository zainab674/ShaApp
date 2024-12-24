import { HttpException, Injectable } from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ResponseCode } from "src/exceptions";

import { RatingDocument, RatingEntity } from "./schema/rating.schema";
import { UpdateRatingDto } from "./dto/rating.update.dto";





@Injectable()
export class RatingService {
    constructor(
        @InjectModel(RatingEntity.name) private schemaModel: Model<RatingDocument>
    ) { }



    async create(createDto: RatingEntity) {
        // const bookingId = createDto;
        // const userId = createDto;
        // const existingReview = await this.schemaModel.findOne({ bookingId, userId });
        // if (existingReview) {
        //     throw new HttpException('You have already reviewed this booking.', 400);
        // }

        const create: RatingDocument = new this.schemaModel(createDto);
        return await create.save().catch((err) => {
            throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
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
                throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
            });

        return {
            totalCount: totalCount.length,
            totalPages: totalPages,
            data: data,
        };
    }



    async update(id: string, updateDataDto: UpdateRatingDto) {
        const updateData = await this.schemaModel
            .findByIdAndUpdate(id, updateDataDto, { new: true })
            .exec()
            .catch((err) => {
                throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
            });

        return { data: updateData };
    }



    async delete(id: string) {
        return await this.schemaModel
            .findByIdAndDelete(id)
            .exec()
            .catch((err) => {
                throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
            });
    }



    async findByUserId(id: string): Promise<any> {
        return await this.schemaModel
            .find({ userId: id })
            .catch((err) => {
                throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
            });

    }
    async findByServiceId(id: string): Promise<any> {
        return await this.schemaModel
            .find({ serviceId: id })
            .catch((err) => {
                throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
            });

    }

    async find(id: string): Promise<any> {
        return await this.schemaModel
            .findById(id)
            .catch((err) => {
                throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
            });

    }






}
