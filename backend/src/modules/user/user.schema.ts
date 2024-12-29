import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import {
  JSONSchema,
  validationMetadatasToSchemas,
} from "class-validator-jsonschema";
import { Document } from "mongoose";
import { generateHash } from "../../common/utils";
import { RoleType } from "../../constants/role-type";
export type UserDocument = User & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class User {
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @ApiProperty()
  @JSONSchema({
    description: "Name of User",
    title: "Name",
  })
  @Prop({ type: "string", trim: true, default: "" })
  name: string;

  @ApiProperty()
  @IsEmail()
  @JSONSchema({
    description: "Email of User",
    title: "Email",
  })
  @Prop({
    type: "string",
    required: false,
    trim: true,
    lowercase: true,
    default: "",
  })
  email: string;

  @IsString()
  @ApiProperty()
  @IsString()
  @MinLength(5)
  @JSONSchema({
    description: "Password of User",
    title: "Password",
  })
  @Prop({ type: "string", trim: true, required: false, default: "" })
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(5)
  @JSONSchema({
    description: "Information about User",
    title: "About",
  })
  @Prop({ type: "string", default: "" })
  about: string;


  @IsEnum(RoleType)
  @IsOptional()
  @ApiProperty()
  @JSONSchema({
    description: "Role of User",
    title: "Role",
  })
  @Prop({ type: "string", required: false, trim: true, default: RoleType.USER })
  role: string;



  @IsOptional()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: "Avatar of User",
    title: "Avatar",
  })
  @JSONSchema({
    description: "Avatar of User",
    title: "Avatar",
  })
  @Prop({
    type: "string",
    format: 'binary', trim: true
  })
  avatar: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @JSONSchema({
    description: "phone",
    title: "phone",
  })
  @Prop({ type: "string", trim: true, default: "" })
  phone: string;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ userName: "text" });
// Hooks
UserSchema.pre<UserDocument>("save", async function (next) {
  this.password = generateHash(this.password);
  this.email = this.email.toLowerCase();
  next();
});

UserSchema.virtual("id").get(function (this: UserDocument) {
  return this._id.toString();
});
export { UserSchema };
export const userJsonSchema = validationMetadatasToSchemas();
