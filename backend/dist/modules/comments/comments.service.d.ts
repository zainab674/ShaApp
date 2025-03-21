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
import mongoose, { Model } from "mongoose";
import { Comments, CommentsDocument } from "./schema/comments.schema";
import { UserService } from "../user/user.service";
import { NotificationService } from "../notification/notification.service";
import { PostsService } from "../posts/posts.service";
import { User } from "../user/user.schema";
export declare class CommentsService {
    private schemaModel;
    private userService;
    private postService;
    private readonly notificationService;
    constructor(schemaModel: Model<CommentsDocument>, userService: UserService, postService: PostsService, notificationService: NotificationService);
    create(createDto: Comments, creator: User): Promise<CommentsDocument | (mongoose.Document<unknown, {}, CommentsDocument> & Comments & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })>;
    findPostComment(postId: string): Promise<{
        data: any[];
    }>;
    private buildNestedReplies;
}
