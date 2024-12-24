import { ServiceEntity } from "../schema/service.schema";
declare const FilterDto_base: import("@nestjs/common").Type<Partial<Pick<ServiceEntity, "category" | "price" | "country" | "city" | "location">>>;
export declare class FilterDto extends FilterDto_base {
    radius: number;
}
export {};
