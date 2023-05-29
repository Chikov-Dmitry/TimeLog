import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { OnlineService } from './online.service';
import {
  IClientToServerEvents,
  IServerToClientEvents,
  UserOnlineDto,
} from '@timelog/interfaces';

const users: Record<string, string> = {};

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class OnlineGateway {
  constructor(private readonly onlineService: OnlineService) {}

  @WebSocketServer()
  server: Server<IClientToServerEvents, IServerToClientEvents>;

  @SubscribeMessage('getOnlineList')
  async getOnlineList(): Promise<UserOnlineDto> {
    return await this.onlineService.getOnlineList();
  }

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    const socketId = client.id;
    users[socketId] = userId;
    await this.onlineService.addToOnline(userId);
    client.broadcast.emit('log', `${userId} connected`);

    this.server.emit('onlineList', await this.onlineService.getOnlineList());
  }

  async handleDisconnect(client: Socket) {
    const socketId = client.id;
    const userId = users[socketId];
    delete users[socketId];
    await this.onlineService.deleteFromOnline(userId);

    client.broadcast.emit('log', `${userId} disconnected`);

    this.server.emit('onlineList', await this.onlineService.getOnlineList());
  }
}
