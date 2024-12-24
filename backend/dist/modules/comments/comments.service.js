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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const exceptions_1 = require("../../exceptions");
const comments_schema_1 = require("./schema/comments.schema");
const constants_1 = require("../../constants");
const user_service_1 = require("../user/user.service");
const notification_service_1 = require("../notification/notification.service");
const posts_service_1 = require("../posts/posts.service");
let CommentsService = class CommentsService {
    constructor(schemaModel, userService, postService, notificationService) {
        this.schemaModel = schemaModel;
        this.userService = userService;
        this.postService = postService;
        this.notificationService = notificationService;
    }
    async create(createDto, creator) {
        try {
            if (createDto.type === constants_1.CommentType.REPLY) {
                const parentComment = await this.schemaModel
                    .findById(createDto.parentComment)
                    .exec();
                if (parentComment) {
                    const newReply = new this.schemaModel(createDto);
                    await newReply.save();
                    parentComment.replies.push(newReply._id);
                    await parentComment.save();
                    const user = await this.postService.findUserId(createDto.postId);
                    if (user) {
                        const authorData = await this.userService.findOne({
                            _id: user.userId,
                        });
                        if (newReply) {
                            if (createDto.userId !== user.userId.toString()) {
                                if (authorData) {
                                    const content = {
                                        category: "REPLY",
                                        title: "New Reply",
                                        description: createDto.body,
                                        id: newReply.id,
                                        tokens: authorData.tokens,
                                        userId: createDto.userId,
                                        allowPush: authorData.inPushPost,
                                        allowInApp: authorData.inAppPost,
                                        postId: createDto.postId,
                                        receiverId: user.userId.toString(),
                                    };
                                    const notifyData = {
                                        userName: creator.name,
                                        receiverName: authorData.name,
                                        email: authorData.email,
                                        notificationType: "REPLY",
                                        allowTosend: authorData.inEmailPost,
                                    };
                                    await this.notificationService.sendNotification(content, notifyData);
                                }
                            }
                            return newReply;
                        }
                    }
                    return newReply;
                }
                else {
                    throw new common_1.HttpException("Parent comment not found", exceptions_1.ResponseCode.NOT_FOUND);
                }
            }
            else {
                const create = new this.schemaModel(createDto);
                const data = await create.save().catch((err) => {
                    throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
                });
                const user = await this.postService.findUserId(createDto.postId);
                if (user) {
                    const authorData = await this.userService.findOne({
                        _id: user.userId,
                    });
                    if (data) {
                        if (createDto.userId !== user.userId.toString()) {
                            if (authorData) {
                                const content = {
                                    category: "COMMENT",
                                    title: "New Comment",
                                    description: createDto.body,
                                    id: data.id,
                                    tokens: authorData.tokens,
                                    userId: createDto.userId,
                                    allowPush: authorData.inPushPost,
                                    allowInApp: authorData.inAppPost,
                                    postId: createDto.postId,
                                    receiverId: user.userId.toString(),
                                };
                                const notifyData = {
                                    userName: creator.name,
                                    receiverName: authorData.name,
                                    email: authorData.email,
                                    notificationType: "COMMENT",
                                    allowTosend: authorData.inEmailPost,
                                };
                                await this.notificationService.sendNotification(content, notifyData);
                            }
                        }
                        return data;
                    }
                }
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message, exceptions_1.ResponseCode.INTERNAL_ERROR);
        }
    }
    async findPostComment(postId) {
        const comments = await this.schemaModel
            .aggregate([
            {
                $match: {
                    postId: new mongoose_2.default.Types.ObjectId(postId),
                    parentComment: null,
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "creator",
                    pipeline: [
                        {
                            $lookup: {
                                from: "reviews",
                                localField: "_id",
                                foreignField: "userId",
                                as: "reviews",
                            },
                        },
                        {
                            $addFields: {
                                rating: {
                                    $round: [{ $ifNull: [{ $avg: "$reviews.start" }, 0.0] }, 1],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                rating: 1,
                                avatar: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: "$creator",
            },
        ])
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        const commentsWithReplies = await Promise.all(comments.map(async (comment) => {
            const nestedReplies = await this.buildNestedReplies(comment._id);
            comment.replies = nestedReplies;
            return comment;
        }));
        return {
            data: commentsWithReplies,
        };
    }
    async buildNestedReplies(parentCommentId) {
        const replies = await this.schemaModel
            .aggregate([
            {
                $match: {
                    parentComment: new mongoose_2.default.Types.ObjectId(parentCommentId),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "creator",
                    pipeline: [
                        {
                            $lookup: {
                                from: "reviews",
                                localField: "_id",
                                foreignField: "userId",
                                as: "reviews",
                            },
                        },
                        {
                            $addFields: {
                                rating: {
                                    $round: [{ $ifNull: [{ $avg: "$reviews.start" }, 0.0] }, 1],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                rating: 1,
                                avatar: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: "$creator",
            },
        ])
            .exec();
        const nestedReplies = await Promise.all(replies.map(async (reply) => {
            const nestedReplies = await this.buildNestedReplies(reply._id);
            reply.replies = nestedReplies;
            return reply;
        }));
        return nestedReplies;
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comments_schema_1.Comments.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        posts_service_1.PostsService,
        notification_service_1.NotificationService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map