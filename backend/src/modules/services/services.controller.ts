import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiConsumes, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { constTexts } from "src/constants";
import { ServiceService } from "./services.service";
import { ServiceEntity } from "./schema/service.schema";
import { Action } from "src/casl/userRoles";
import { ApiPageOkResponse, Auth, AuthUser, Public } from "src/decorators";
import { User } from "../user/user.schema";
import { UpdateServiceDto } from "./dto/service-update.dto";
import { FilterDto } from "./dto/filter.service.dto";
import { LocationDto } from "./dto/location.dto";
import { SearchDto } from "./dto/search.dto";
import { MultipleFileUpload } from "src/interceptors/multi-upload.interceptor";



@Controller(constTexts.serviceRoute.name)
@ApiTags(constTexts.serviceRoute.name)
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) { }



    @Post()
    @UseInterceptors(MultipleFileUpload("image", 5)) // 'image' matches the key for file uploads
    @ApiConsumes('multipart/form-data')
    @ApiPageOkResponse({
        description: "Create Service",
        type: ServiceEntity,
    })
    @Auth(Action.Create, "Service")
    async create(
        @AuthUser() user: User,
        @UploadedFiles() image: Express.Multer.File[],
        @Body() createDto: ServiceEntity) {
        createDto.userId = user.id;

        if (image) {
            createDto.image = image.map((file) => file.filename); // Save file names or paths
        }

        return this.serviceService.create(createDto);

    }

    @Get()
    @ApiPageOkResponse({
        description: "Get all List",
        type: ServiceEntity,
    })
    @ApiQuery({ name: "page", required: false, type: Number })
    @ApiQuery({ name: "limit", required: false, type: Number })
    findall(@Query("page") page = 1, @Query("limit") limit = 20) {
        return this.serviceService.findall(page, limit);
    }



    @Patch(constTexts.serviceRoute.update)
    @UseInterceptors(MultipleFileUpload("image", 5)) // 'image' matches the key for file uploads
    @ApiConsumes('multipart/form-data')
    @ApiPageOkResponse({
        description: "Update Service",
        type: ServiceEntity,
    })
    @Auth(Action.Update, "Service")
    async update(
        @Param("id") id: string,
        @UploadedFiles() image: Express.Multer.File[],
        @Body() updateDatato: UpdateServiceDto) {
        if (image) {
            updateDatato.image = image.map((file) => file.filename); // Save file names or paths
        }
        return this.serviceService.update(id, updateDatato);
    }

    @Delete(constTexts.serviceRoute.delete)
    @ApiPageOkResponse({
        description: "Delete Service",
        type: ServiceEntity,
    })
    @Auth(Action.Update, "Service")
    async deleteService(@Param("id") id: string) {
        return this.serviceService.deleteService(id);
    }

    @Public()
    @Post(constTexts.serviceRoute.withinRadius)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: ServiceEntity, description: " Fetched within radius" })
    async getWithinRadius(@Body() locationDto: LocationDto): Promise<any> {



        return await this.serviceService.getWithinRadius(locationDto);
    }




    @Public()
    @Post(constTexts.serviceRoute.searchByName)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: ServiceEntity, description: " Searched By Name" })
    async searchByName(@Body() searchDto: SearchDto): Promise<any> {


        return await this.serviceService.searchByName(searchDto);
    }



    @Public()
    @Post(constTexts.serviceRoute.searchByCategory)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: ServiceEntity, description: "Searched By Category " })
    async searchByCategory(@Body() searchDto: SearchDto): Promise<any> {


        return await this.serviceService.searchByCategory(searchDto);
    }




    @Public()
    @Post(constTexts.serviceRoute.filter)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: ServiceEntity, description: "Successfully Filtered" })
    async filteredEvents(@Body() filterDto: FilterDto): Promise<any> {


        return await this.serviceService.filterEvents(filterDto);
    }



    @Get(constTexts.serviceRoute.specific)
    @ApiPageOkResponse({
        description: "Get Service",
        type: ServiceEntity,
    })

    async findBooking(@Param("id") id: string) {
        return this.serviceService.find(id);
    }

    @Get(constTexts.serviceRoute.users)
    @ApiPageOkResponse({
        description: "Get Service of User",
        type: ServiceEntity,
    })

    async findBookingOfUser(@Param("id") id: string) {
        return this.serviceService.findByUserId(id);
    }


}
