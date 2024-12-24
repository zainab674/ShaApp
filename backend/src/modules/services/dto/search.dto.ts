import { PartialType, PickType } from "@nestjs/swagger";
import { ServiceEntity } from "../schema/service.schema";



export class SearchDto extends PartialType(PickType(ServiceEntity, [

    "category",
    "title",


] as const)) {

}