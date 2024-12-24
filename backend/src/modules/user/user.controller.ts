import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  // HttpCode,
  // HttpStatus,
  Patch,
  Query,
  // ValidationPipe,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { constTexts } from "src/constants";
import { Action } from "../../casl/userRoles";
// import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { ApiPageOkResponse, Auth, AuthUser } from "../../decorators";
// import { LoggerMessages } from "../../exceptions/index";
// import { LoggerService } from "../../logger/logger.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.schema";
import { UserService } from "./user.service";

@Controller(constTexts.userRoute.name)
@ApiTags(constTexts.userRoute.name)
export class UserController {
  constructor(
    private userService: UserService,
    // private readonly loggerService: LoggerService
  ) {
    // this.loggerService.setContext("users controller");
  }




  @Patch()
  @ApiPageOkResponse({
    description: "Update User Profile",
    type: User,
  })
  @Auth(Action.Read, "User")
  async update(@AuthUser() user: User, @Body() userUpdateDto: UpdateUserDto) {
    return this.userService.update(user.id, userUpdateDto);
  }

  @Delete(constTexts.userRoute.deleteAccount)
  @ApiPageOkResponse({
    description: "Delete User",
    type: User,
  })
  @Auth(Action.Delete, "User")
  async deleteAccount(@AuthUser() user: User) {
    return this.userService.delete(user.id);
  }




  @Get(constTexts.userRoute.allUsers)
  @ApiPageOkResponse({
    description: "Get all List",
    type: User,
  })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  async findall(@Query("page") page = 1, @Query("limit") limit = 20) {
    return this.userService.findall(page, limit);
  }


  @Get(constTexts.userRoute.oneUser)
  @ApiPageOkResponse({
    description: "Get one ",
    type: User,
  })

  async findOne(@Param("id") id: string) {
    return this.userService.find(id);
  }
}
