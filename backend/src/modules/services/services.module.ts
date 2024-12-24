import { Module } from "@nestjs/common";
// import { PostsService } from "./posts.service";
// import { PostsController } from "./posts.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../user/user.module";
// import { PostEntity, PostSchema } from "./schema/post.schema";

import { HttpModule } from "@nestjs/axios";
import { ServiceEntity, ServiceSchema } from "./schema/service.schema";
import { ServiceController } from "./services.controller";
import { ServiceService } from "./services.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ServiceEntity.name, schema: ServiceSchema }]),
        UserModule,
        HttpModule,
    ],
    controllers: [ServiceController],
    providers: [ServiceService],
    exports: [ServiceService],
})
export class ServiceModule { }
