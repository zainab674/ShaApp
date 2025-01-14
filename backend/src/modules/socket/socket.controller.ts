import { Controller, Delete, Param, } from '@nestjs/common';
import { SocketService } from './socket.service';
import { ApiTags } from '@nestjs/swagger';
import { Action } from 'src/casl/userRoles';
import { ApiPageOkResponse, Auth } from 'src/decorators';

import { Socket } from './socket.schema';
// import { ApiConsumes } from '@nestjs/swagger';
// import { Action } from 'src/casl/userRoles';
// import { Auth, AuthUser } from 'src/decorators';
// import { User } from '../user/user.schema';
// import { SocketService } from './socket.service';
// import { CreateSocketDto } from './dto/create-socket.dto';
// import { MyGateway } from './gateway';

@Controller('socket')
@ApiTags('socket')
export class SocketController {
  constructor(private readonly socketService: SocketService) { }


  @Delete("delete/:id")
  @ApiPageOkResponse({
    description: "Delete Notification",
    type: Socket,
  })
  @Auth(Action.Update, "socket")
  async deletePost(@Param("id") id: string) {
    return this.socketService.delete(id);
  }




}
