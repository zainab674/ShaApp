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
export type CommentsDocument = Comments & Document;
export declare class Comments {
    id: string;
    body: string;
    userId: string;
    postId: string;
    parentComment: string;
    replies: string[];
    type: string;
}
declare const CommentsSchema: mongoose.Schema<Comments, mongoose.Model<Comments, any, any, any, mongoose.Document<unknown, any, Comments> & Comments & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comments, mongoose.Document<unknown, {}, mongoose.FlatRecord<Comments>> & mongoose.FlatRecord<Comments> & {
    _id: mongoose.Types.ObjectId;
}>;
export { CommentsSchema };
export declare const userJsonSchema: Record<string, import("openapi3-ts").SchemaObject>;
