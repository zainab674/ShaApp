import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { ServiceEntity } from "../schema/service.schema";
import { IsNumber, IsOptional, } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";


export class FilterDto extends PartialType(PickType(ServiceEntity, [

    "category",
    "location",
    "country",
    "city",
    "price",



] as const)) {
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    @JSONSchema({
        description: "Radius ",
        title: "Radius",
    })
    radius: number;
}

