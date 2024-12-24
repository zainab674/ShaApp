import { ServiceEntity } from "../schema/service.schema";
declare const LocationDto_base: import("@nestjs/common").Type<Pick<ServiceEntity, "location">>;
export declare class LocationDto extends LocationDto_base {
    radius: number;
}
export {};
