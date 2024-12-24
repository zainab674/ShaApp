import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../user/user.module";


import { HttpModule } from "@nestjs/axios";
import { RatingEntity, RatingSchema } from "./schema/rating.schema";
import { RatingController } from "./rating.controller";
import { RatingService } from "./rating.service";



@Module({
    imports: [
        MongooseModule.forFeature([{ name: RatingEntity.name, schema: RatingSchema }]),
        UserModule,
        HttpModule,
    ],
    controllers: [RatingController],
    providers: [RatingService],
    exports: [RatingService],
})
export class RatingModule { }
