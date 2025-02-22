import { HttpException, Injectable } from "@nestjs/common";
import { BookingDocument, BookingEntity } from "./schema/booking.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ResponseCode } from "src/exceptions";
import { UpdateBookingDto } from "./dto/booking-update.dto";





@Injectable()
export class BookingService {
    constructor(
        @InjectModel(BookingEntity.name) private schemaModel: Model<BookingDocument>
    ) { }



    async create(createDto: BookingEntity) {






        const create: BookingDocument = new this.schemaModel(createDto);
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



    async update(id: string, updateDataDto: UpdateBookingDto) {
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

    async findByServiceAndUserId(serviceId: string, userId: string): Promise<any> {
        try {
            // Create start of today's date
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const booking = await this.schemaModel.findOne({
                serviceId,
                userId,
                // Add date filter condition
                startDate: {
                    $gte: today // Greater than or equal to start of today
                },
                status: { $ne: 'rejected' } // Not equal to rejected
            });

            if (booking) {
                console.log("booking", booking);
                return booking;
            }

            return null;
        } catch (err) {
            throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
        }
    }


    async find(id: string): Promise<any> {
        return await this.schemaModel
            .findById(id)
            .catch((err) => {
                throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
            });

    }






}
