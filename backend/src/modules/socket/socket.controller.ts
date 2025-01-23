import { Controller, Delete, Param, } from '@nestjs/common';
import { SocketService } from './socket.service';
import { ApiTags } from '@nestjs/swagger';
import { Action } from 'src/casl/userRoles';
import { ApiPageOkResponse, Auth } from 'src/decorators';

import { Socket } from './socket.schema';

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
