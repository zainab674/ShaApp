import { SocketService } from './socket.service';
export declare class SocketController {
    private readonly socketService;
    constructor(socketService: SocketService);
    deletePost(id: string): Promise<any>;
}
