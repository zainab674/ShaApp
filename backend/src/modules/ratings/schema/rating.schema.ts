import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {

    IsString,
    MinLength,

} from "class-validator";
import {
    JSONSchema,
    validationMetadatasToSchemas,
} from "class-validator-jsonschema";
import mongoose, { Document } from "mongoose";




export type RatingDocument = RatingEntity & Document;
@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true,
})
export class RatingEntity {
    id: string;


    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: "Comment of Rating",
        title: "Comment",
    })
    @Prop({ type: "string", required: true, trim: true })
    comment: string;



    @IsString()
    @MinLength(1)
    @ApiProperty()
    @JSONSchema({
        description: " Rating",
        title: "Rating",
    })
    @Prop({ type: "number", required: true, trim: true })
    rating: number;

    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    userId: string;

    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "ServiceEntity" })
    serviceId: string;

    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "BookingEntity" })
    bookingId: string;
}

const RatingSchema = SchemaFactory.createForClass(RatingEntity);
RatingSchema.index({ location: "2dsphere" });

// Hooks
RatingSchema.virtual("id").get(function (this: RatingDocument) {
    return this._id.toString();
});
export { RatingSchema };
export const userJsonSchema = validationMetadatasToSchemas();
//console.log('schemas=>', JSON.stringify(userJsonSchema)); logger , exclude fileds, test cases
