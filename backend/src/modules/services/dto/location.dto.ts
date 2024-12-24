import { ApiProperty, PickType } from "@nestjs/swagger";

import { IsNumber, } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";
import { ServiceEntity } from "../schema/service.schema";


export class LocationDto extends PickType(ServiceEntity, [

    "location"

] as const) {
    @IsNumber()
    @ApiProperty()
    @JSONSchema({
        description: "Radius ",
        title: "Radius",
    })
    radius: number;
}