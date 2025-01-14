import { PartialType, PickType } from "@nestjs/swagger";
import { Socket } from "../socket.schema";

export class CreateSocketDto extends PartialType(PickType(Socket, [
    "userId",
    "bookingId",
    "status",
    "message"
])) { }
