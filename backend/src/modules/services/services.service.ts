import { HttpException, Injectable } from "@nestjs/common";
import { ServiceDocument, ServiceEntity } from "./schema/service.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ResponseCode } from "src/exceptions";
import { UpdateServiceDto } from "./dto/service-update.dto";
import { LocationDto } from "./dto/location.dto";
import { SearchDto } from "./dto/search.dto";
import { FilterDto } from "./dto/filter.service.dto";


@Injectable()
export class ServiceService {
    constructor(
        @InjectModel(ServiceEntity.name) private schemaModel: Model<ServiceDocument>
    ) { }



    async create(createDto: ServiceEntity) {

        const create: ServiceDocument = new this.schemaModel(createDto);
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



    async update(id: string, updateDataDto: UpdateServiceDto) {
        const updateData = await this.schemaModel
            .findByIdAndUpdate(id, updateDataDto, { new: true })
            .exec()
            .catch((err) => {
                throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
            });

        return { data: updateData };
    }



    async deleteService(id: string) {
        return await this.schemaModel
            .findByIdAndDelete(id)
            .exec()
            .catch((err) => {
                throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
            });
    }



    async getWithinRadius(locationDto: LocationDto): Promise<any> {

        const pipeline = [];
        const radius = locationDto.radius



        const [longitude, latitude] = locationDto.location.coordinates;

        pipeline.push({
            $match: {
                location: {
                    $geoWithin: {
                        $centerSphere: [
                            [longitude, latitude],
                            radius / 6371.1, // Convert radius from meters to radians (earth radius is approximately 6371.1 km)
                        ],
                    },
                },
            },
        });



        return await this.schemaModel.aggregate(pipeline).exec()
            .catch((err) => {
                throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
            });



    }



    async searchByName(searchDto: SearchDto): Promise<any> {

        const name = searchDto.title;
        return await this.schemaModel.aggregate([
            {
                $match: {
                    title: { $regex: `.*${name}.*`, $options: "i" },
                },
            },
        ]).exec()
            .catch((err) => {
                throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
            });



    }




    async searchByCategory(searchDto: SearchDto): Promise<any> {

        const category = searchDto.category;
        return await this.schemaModel.aggregate([
            {
                $match: {
                    category: { $regex: `.*${category}.*`, $options: "i" },
                },
            },
        ]).exec()
            .catch((err) => {
                throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
            });



    }



    async filterEvents(filterDto: FilterDto): Promise<any> {

        const city = filterDto.city;
        const country = filterDto.country;




        const pipeline = [];




        if (country) {
            pipeline.push({ $match: { country }, });
        }
        if (city) {
            pipeline.push({ $match: { city }, });
        }




        // Execute aggregation pipeline
        return await this.schemaModel.aggregate(pipeline).exec()
            .catch((err) => {
                throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
            });


    }



    async findByUserId(id: string): Promise<any> {
        console.log("id", id)
        return await this.schemaModel
            .find({ userId: id })
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
