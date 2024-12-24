import { User } from "../../user/user.schema";
declare const UserSignupDto_base: import("@nestjs/common").Type<Pick<User, "name" | "email" | "password" | "role">>;
export declare class UserSignupDto extends UserSignupDto_base {
}
export {};
