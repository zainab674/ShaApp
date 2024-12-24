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
import mongoose, { Document } from "mongoose";
export type RatingDocument = RatingEntity & Document;
export declare class RatingEntity {
    id: string;
    comment: string;
    rating: number;
    userId: string;
    serviceId: string;
    bookingId: string;
}
declare const RatingSchema: mongoose.Schema<RatingEntity, mongoose.Model<RatingEntity, any, any, any, mongoose.Document<unknown, any, RatingEntity> & RatingEntity & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, RatingEntity, mongoose.Document<unknown, {}, mongoose.FlatRecord<RatingEntity>> & mongoose.FlatRecord<RatingEntity> & {
    _id: mongoose.Types.ObjectId;
}>;
export { RatingSchema };
export declare const userJsonSchema: Record<string, import("openapi3-ts").SchemaObject>;
