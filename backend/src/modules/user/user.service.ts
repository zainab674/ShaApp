import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { getCharacterString } from "../../common/utils";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import {
  // ErrorCodesMeta,
  ResponseCode,
  // ResponseMessage,
} from "../../exceptions";
import type { Optional } from "../../types";
// import { ResetPasswordDto } from "../auth/dto/reset-password.dto";
// import { VerifyOtpDto } from "../auth/dto/verify-otp.dto";

import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument, userJsonSchema } from "./user.schema";
// import { ForgotPasswordDto } from "../auth/dto/forgot-password.dto";
// import { VerifyAccountDto } from "../auth/dto/verify-account.dto";
import { UserSignupDto } from "../auth/dto/user.signup.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,

  ) { }

  /**
   * get user schema
   * @returns
   */
  // async sendForgetPassword(ForgetPasswordDto: ForgotPasswordDto) {
  //   const getFourDigitRandomNumber = this.generateString(4);
  //   const sendOTP = await this.userModel.findOneAndUpdate(
  //     { email: ForgetPasswordDto.email },
  //     {
  //       $set: {
  //         otp: (await getFourDigitRandomNumber).toString(),
  //         isOtpUsed: false,
  //       },
  //     }
  //   );

  //   if (!sendOTP) {
  //     throw new HttpException(
  //       ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL,
  //       ResponseCode.UNAUTHORIZED
  //     );
  //   }

  //   const user = {
  //     email: ForgetPasswordDto.email,
  //     otp: (await getFourDigitRandomNumber).toString(),
  //   };

  //   await this.sendMail.sendForgetPasswordEmail(user);
  //   return {
  //     message: ResponseMessage.SUCCESS,
  //     successCode: ResponseCode.SUCCESS,
  //   };
  // }

  /**
   * get user schema
   * @returns
   */
  // async verifyOtp(verifyOtpDto: VerifyOtpDto) {
  //   const otp = await this.userModel.findOneAndUpdate(
  //     { otp: verifyOtpDto.otp, isOtpUsed: false },
  //     {
  //       $set: {
  //         isOtpUsed: true,
  //       },
  //     }
  //   );
  //   if (!otp) {
  //     throw new HttpException(
  //       ErrorCodesMeta.INVALID_OTP,
  //       ResponseCode.UNAUTHORIZED
  //     );
  //   }

  //   return {
  //     email: otp.email,
  //   };
  // }

  async logout(userId: string): Promise<any> {
    return await this.userModel
      .findByIdAndUpdate(userId, { tokens: [] })
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
  }

  /**
   * get user schema
   * @returns
   */
  // async resetPassword(resetPasswordDto: ResetPasswordDto) {
  //   resetPasswordDto.password = generateHash(resetPasswordDto.password);
  //   const data = await this.userModel.findOneAndUpdate(
  //     {
  //       email: resetPasswordDto.email,
  //       isOtpUsed: true,
  //       otp: resetPasswordDto.otp,
  //     },
  //     {
  //       $set: {
  //         password: resetPasswordDto.password,
  //         isOtpUsed: false,
  //       },
  //     }
  //   );
  //   if (!data) {
  //     throw new HttpException(
  //       ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL,
  //       ResponseCode.UNAUTHORIZED
  //     );
  //   }
  //   data.password = "";
  //   data.otp = "";
  //   return {
  //     data,
  //   };
  // }
  /**
   * get user schema
   * @returns
   */
  async getSchema() {
    return await userJsonSchema.Category;
  }

  /**
   * verify the account
   * @param email
   * @returns
   */
  // async verifyAccount(dto: VerifyAccountDto): Promise<any> {
  //   const accExist = await this.findOne({
  //     email: dto.email

  //   });
  //   if (!accExist) {
  //     throw new HttpException(
  //       ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL,
  //       ResponseCode.UNAUTHORIZED
  //     );
  //   }
  //   const data = await this.userModel.updateOne(
  //     { email: dto.email },
  //     {
  //       $set: {
  //         verify: "true",
  //         isOtpUsed: false,
  //       },
  //     }
  //   );

  //   if (data) {
  //     return accExist;
  //   }
  // }
  /**
   * Get User
   * @param pageOptionsDto
   * @returns
   */

  async getOne(id: string): Promise<User> {
    const data = await this.userModel.findById({ _id: id }).catch((err) => {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    });

    (data.password = "");
    return data;
  }
  async find(id: string): Promise<User> {
    return await this.userModel
      .findById(id)
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
  }

  /**
   * Find single user
   *
   *
   */
  async findOne(findData: any): Promise<User | null> {
    const user = await this.userModel.findOne(findData).catch((err) => {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    });
    return user;
  }
  /**
   * Find single user by email
   *
   *
   */
  async findByEmail(
    options: Partial<{ email: string }>
  ): Promise<Optional<User>> {
    const user = await this.userModel
      .findOne({ email: options.email })
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    return user;
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
  /**
   * create single user
   *
   *
   */
  async createUser(userRegisterDto: UserSignupDto): Promise<UserSignupDto> {
    const createdUser = await new this.userModel(userRegisterDto)
      .save()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });




    return createdUser;
    // }
  }



  async getUsers(pageOptionsDto: PageOptionsDto): Promise<User[]> {
    //let regex = new RegExp(value.searchQuery,'i');
    //{ $and: [ { $or: [{title: regex },{description: regex}] }, {category: value.category}, {city:value.city} ] }
    const queryBuilder = await this.userModel
      .aggregate([
        {
          $facet: {
            metadata: [{ $count: "total" }],
            data: [
              { $sort: { [pageOptionsDto.column]: pageOptionsDto.order } },
              { $skip: pageOptionsDto.skip },
              { $limit: pageOptionsDto.take },
            ],
          },
        },
        {
          $project: {
            data: 1,
            // Get total from the first element of the metadata array
            total: { $arrayElemAt: ["$metadata.total", 0] },
          },
        },
      ])
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    return queryBuilder;
  }

  async update(userId: string, userUpdateDto: UpdateUserDto) {
    const returnObj = await this.userModel
      .findByIdAndUpdate(userId, userUpdateDto, { new: true })
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    return { data: returnObj };
  }

  async getProfileData(userId: string) {
    const data = await this.userModel
      .findById(userId)
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    data.password = "";
    return data;
  }

  async delete(userId: string) {
    return await this.userModel
      .findByIdAndDelete(userId)
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
  }



  async findall(page = 1, limit = 20) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalCount = await this.userModel.find().exec();
    const totalPages = Math.ceil(totalCount.length / limit);
    const data = await this.userModel
      .aggregate([
        {
          $skip: startIndex,
        },
        {
          $limit: endIndex,
        },
      ])
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });

    return {
      totalCount: totalCount.length,
      totalPages: totalPages,
      data: data,
    };
  }



}
