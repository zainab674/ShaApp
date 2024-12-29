
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { constTexts } from "src/constants";
import { BookingService } from "./booking.service";
import { BookingEntity } from "./schema/booking.schema";
import { Action } from "src/casl/userRoles";
import { ApiPageOkResponse, Auth, AuthUser } from "src/decorators";
import { User } from "../user/user.schema";
import { UpdateBookingDto } from "./dto/booking-update.dto";






@Controller(constTexts.bookingRoute.name)
@ApiTags(constTexts.bookingRoute.name)
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Post()
    @ApiPageOkResponse({
        description: "Create Booking",
        type: BookingEntity,
    })
    @Auth(Action.Create, "Booking")
    async create(@AuthUser() user: User, @Body() createDto: BookingEntity) {
        createDto.userId = user.id;

        return this.bookingService.create(createDto);
    }

    @Get()
    @ApiPageOkResponse({
        description: "Get all List",
        type: BookingEntity,
    })
    @ApiQuery({ name: "page", required: false, type: Number })
    @ApiQuery({ name: "limit", required: false, type: Number })
    findall(@Query("page") page = 1, @Query("limit") limit = 20) {
        return this.bookingService.findall(page, limit);
    }

    @Patch(constTexts.bookingRoute.update)
    @ApiPageOkResponse({
        description: "Update Booking",
        type: BookingEntity,
    })
    @Auth(Action.Update, "Booking")
    async update(@Param("id") id: string, @Body() updateDatato: UpdateBookingDto) {
        return this.bookingService.update(id, updateDatato);
    }

    @Delete(constTexts.bookingRoute.delete)
    @ApiPageOkResponse({
        description: "Delete Booking",
        type: BookingEntity,
    })
    @Auth(Action.Update, "Booking")
    async deleteService(@Param("id") id: string) {
        return this.bookingService.delete(id);
    }


    @Get(constTexts.bookingRoute.details)
    @ApiPageOkResponse({
        description: "Get Booking",
        type: BookingEntity,
    })

    async findBooking(@Param("id") id: string) {
        return this.bookingService.find(id);
    }

    @Get(constTexts.bookingRoute.getUserBookings)
    @ApiPageOkResponse({
        description: "Get Booking of User",
        type: BookingEntity,
    })

    async findBookingOfUser(@Param("id") id: string) {
        return this.bookingService.findByUserId(id);
    }



    @Get(constTexts.bookingRoute.getServiceBookings)
    @ApiPageOkResponse({
        description: "Get Booking of Service",
        type: BookingEntity,
    })

    async findBookingOfService(@Param("id") id: string) {
        return this.bookingService.findByServiceId(id);
    }


    @Get(constTexts.bookingRoute.checkBooking)
    @ApiPageOkResponse({
        description: 'Check if there is a pending booking for the given service and user.',
        type: Boolean,
    })
    @Auth(Action.Update, "Booking")
    async CheckBooking(
        @AuthUser() user: User,
        @Param('serviceId') serviceId: string,

    ): Promise<boolean> {
        const userId = user.id;
        return this.bookingService.findByServiceAndUserId(serviceId, userId);
    }

}
