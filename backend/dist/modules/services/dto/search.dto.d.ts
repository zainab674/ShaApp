import { ServiceEntity } from "../schema/service.schema";
declare const SearchDto_base: import("@nestjs/common").Type<Partial<Pick<ServiceEntity, "title" | "category">>>;
export declare class SearchDto extends SearchDto_base {
}
export {};
