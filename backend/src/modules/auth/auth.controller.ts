import {
  Body,
  Controller,
  Get,
  HttpCode,
  // HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { getCharacterString } from "../../common/utils";
import { Action } from "../../casl/userRoles";
import { constTexts } from "../../constants";
import { Auth, AuthUser, Public } from "../../decorators";
import { User } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { IsUserUnique } from "./../../decorators/user-signup.decorator";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dto/user.login.dto";
import { TokenPayloadDto } from "./dto/TokenPayloadDto";

import { UserSignupDto } from "./dto/user.signup.dto";
import { ServiceService } from "../services/services.service";
import { BookingService } from "../bookings/booking.service";
import { SocketService } from "../socket/socket.service";

@Controller(constTexts.authRoute.name)
@ApiTags(constTexts.authRoute.name)
export class AuthController {
  loggerService: any;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private serviceService: ServiceService,
    private bookingService: BookingService,
    private socketService: SocketService,

  ) {
  }

  async generateString(length) {
    let result = "";
    const characters = getCharacterString();
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }



  @Public()
  @Post(constTexts.authRoute.login)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TokenPayloadDto,
    description: "User info with access token",
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto
  ): Promise<TokenPayloadDto> {
    const userEntity: User = await this.authService.validateUser(userLoginDto);

    const token: TokenPayloadDto =
      await this.authService.createAccessToken(userEntity);
    return token;

  }

  @Public()
  @Post(constTexts.authRoute.signUp)
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: User, description: "Successfully Registered" })
  @UseGuards(IsUserUnique)
  async userRegister(
    @Body() userRegisterDto: UserSignupDto
  ): Promise<UserSignupDto> {
    return await this.userService.createUser(userRegisterDto);
  }

  @Get(constTexts.authRoute.me)
  @HttpCode(HttpStatus.OK)
  @Auth(Action.Read, "User")
  @ApiOkResponse({ type: User, description: "current user info" })
  async getCurrentUser(@AuthUser() user: User) {
    const [profileData, services, booking, notify] = await Promise.all([
      this.userService.getProfileData(user.id),
      this.serviceService.findByUserId(user.id),
      this.bookingService.findByUserId(user.id),
      this.socketService.getAll(user.id),

    ])
    return {
      profile: profileData,
      services: services,
      booking: booking,
      notify: notify,
    };
  }

  @Get(constTexts.authRoute.logOut)
  @HttpCode(HttpStatus.OK)
  @Auth(Action.Read, "User")
  @ApiOkResponse({ type: User, description: "logout" })
  logOut(@AuthUser() user: User) {
    return this.userService.logout(user.id);
  }

}
