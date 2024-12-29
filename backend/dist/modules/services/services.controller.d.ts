/// <reference types="multer" />
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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ServiceService } from "./services.service";
import { ServiceEntity } from "./schema/service.schema";
import { User } from "../user/user.schema";
import { UpdateServiceDto } from "./dto/service-update.dto";
import { FilterDto } from "./dto/filter.service.dto";
import { LocationDto } from "./dto/location.dto";
import { SearchDto } from "./dto/search.dto";
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    create(user: User, image: Express.Multer.File[], createDto: ServiceEntity): Promise<import("./schema/service.schema").ServiceDocument>;
    findall(page?: number, limit?: number): Promise<{
        totalCount: number;
        totalPages: number;
        data: any[];
    }>;
    update(id: string, image: Express.Multer.File[], updateDatato: UpdateServiceDto): Promise<{
        data: import("mongoose").Document<unknown, {}, import("./schema/service.schema").ServiceDocument> & ServiceEntity & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deleteService(id: string): Promise<import("mongoose").ModifyResult<import("mongoose").Document<unknown, {}, import("./schema/service.schema").ServiceDocument> & ServiceEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getWithinRadius(locationDto: LocationDto): Promise<any>;
    searchByName(searchDto: SearchDto): Promise<any>;
    searchByCategory(searchDto: SearchDto): Promise<any>;
    filteredEvents(filterDto: FilterDto): Promise<any>;
    findBooking(id: string): Promise<any>;
    findBookingOfUser(id: string): Promise<any>;
}
