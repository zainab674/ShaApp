
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { constTexts } from "src/constants";
import { Action } from "src/casl/userRoles";
import { ApiPageOkResponse, Auth, AuthUser } from "src/decorators";
import { User } from "../user/user.schema";
import { RatingService } from "./rating.service";

import { RatingEntity } from "./schema/rating.schema";
import { UpdateRatingDto } from "./dto/rating.update.dto";






@Controller(constTexts.ratingRoute.name)
@ApiTags(constTexts.ratingRoute.name)
export class RatingController {
    constructor(private readonly ratingService: RatingService) { }

    @Post()
    @ApiPageOkResponse({
        description: "Create Rating",
        type: RatingEntity,
    })
    @Auth(Action.Create, "Rating")
    async create(@AuthUser() user: User, @Body() createDto: RatingEntity) {
        createDto.userId = user.id;
        return this.ratingService.create(createDto);
    }

    @Get()
    @ApiPageOkResponse({
        description: "Get all List",
        type: RatingEntity,
    })
    @ApiQuery({ name: "page", required: false, type: Number })
    @ApiQuery({ name: "limit", required: false, type: Number })
    findall(@Query("page") page = 1, @Query("limit") limit = 20) {
        return this.ratingService.findall(page, limit);
    }

    @Patch(constTexts.ratingRoute.update)
    @ApiPageOkResponse({
        description: "Update Service",
        type: RatingEntity,
    })
    @Auth(Action.Update, "Rating")
    async update(@Param("id") id: string, @Body() updateDatato: UpdateRatingDto) {
        return this.ratingService.update(id, updateDatato);
    }

    @Delete(constTexts.ratingRoute.delete)
    @ApiPageOkResponse({
        description: "Delete Rating",
        type: RatingEntity,
    })
    @Auth(Action.Update, "Rating")
    async deleteService(@Param("id") id: string) {
        return this.ratingService.delete(id);
    }




    @Get(constTexts.ratingRoute.details)
    @ApiPageOkResponse({
        description: "Get Rating",
        type: RatingEntity,
    })

    async findRating(@Param("id") id: string) {
        return this.ratingService.find(id);
    }

    @Get(constTexts.ratingRoute.user)
    @ApiPageOkResponse({
        description: "Get Rating of User",
        type: RatingEntity,
    })
    @Auth(Action.Create, "Rating")
    async findRatingOfUser(@AuthUser() user: User) {
        const id = user.id;
        return this.ratingService.findByUserId(id);
    }


    @Get(constTexts.ratingRoute.getServiceRatings)
    @ApiPageOkResponse({
        description: "Get Rating of Service",
        type: RatingEntity,
    })

    async findRatingOfService(@Param("id") id: string) {
        return this.ratingService.findByServiceId(id);
    }


}
