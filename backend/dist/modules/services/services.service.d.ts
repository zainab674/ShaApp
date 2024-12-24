/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { ServiceDocument, ServiceEntity } from "./schema/service.schema";
import { Model } from "mongoose";
import { UpdateServiceDto } from "./dto/service-update.dto";
import { LocationDto } from "./dto/location.dto";
import { SearchDto } from "./dto/search.dto";
import { FilterDto } from "./dto/filter.service.dto";
export declare class ServiceService {
    private schemaModel;
    constructor(schemaModel: Model<ServiceDocument>);
    create(createDto: ServiceEntity): Promise<ServiceDocument>;
    findall(page?: number, limit?: number): Promise<{
        totalCount: number;
        totalPages: number;
        data: any[];
    }>;
    update(id: string, updateDataDto: UpdateServiceDto): Promise<{
        data: import("mongoose").Document<unknown, {}, ServiceDocument> & ServiceEntity & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deleteService(id: string): Promise<import("mongoose").ModifyResult<import("mongoose").Document<unknown, {}, ServiceDocument> & ServiceEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getWithinRadius(locationDto: LocationDto): Promise<any>;
    searchByName(searchDto: SearchDto): Promise<any>;
    searchByCategory(searchDto: SearchDto): Promise<any>;
    filterEvents(filterDto: FilterDto): Promise<any>;
    findByUserId(id: string): Promise<any>;
    find(id: string): Promise<any>;
}
