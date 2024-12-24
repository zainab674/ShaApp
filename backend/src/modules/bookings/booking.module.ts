import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../user/user.module";


import { HttpModule } from "@nestjs/axios";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { BookingEntity, BookingSchema } from "./schema/booking.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: BookingEntity.name, schema: BookingSchema }]),
        UserModule,
        HttpModule,
    ],
    controllers: [BookingController],
    providers: [BookingService],
    exports: [BookingService],
})
export class BookingModule { }
