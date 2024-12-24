import { OmitType, PartialType } from "@nestjs/swagger";
import { User } from "../user.schema";

export class UpdateUserDto extends PartialType(
  OmitType(User, ["role"] as const)
) { }
