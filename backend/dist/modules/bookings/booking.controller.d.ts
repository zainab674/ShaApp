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
import { BookingService } from "./booking.service";
import { BookingEntity } from "./schema/booking.schema";
import { User } from "../user/user.schema";
import { UpdateBookingDto } from "./dto/booking-update.dto";
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(user: User, createDto: BookingEntity): Promise<import("./schema/booking.schema").BookingDocument>;
    findall(page?: number, limit?: number): Promise<{
        totalCount: number;
        totalPages: number;
        data: any[];
    }>;
    update(id: string, updateDatato: UpdateBookingDto): Promise<{
        data: import("mongoose").Document<unknown, {}, import("./schema/booking.schema").BookingDocument> & BookingEntity & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deleteService(id: string): Promise<import("mongoose").ModifyResult<import("mongoose").Document<unknown, {}, import("./schema/booking.schema").BookingDocument> & BookingEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findBooking(id: string): Promise<any>;
    findBookingOfUser(user: User): Promise<any>;
    findBookingOfService(id: string): Promise<any>;
    CheckBooking(user: User, id: string): Promise<any>;
}
