import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { OnlineService } from './online.service';

const users: Record<string, string> = {};

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class OnlineGateway {
  constructor(private readonly onlineService: OnlineService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log(data);
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    const socketId = client.id;
    users[socketId] = userId;
    await this.onlineService.addToOnline(userId);
    client.broadcast.emit('log', `${userId} connected`);
  }

  async handleDisconnect(client: Socket) {
    const socketId = client.id;
    const userId = users[socketId];
    delete users[socketId];
    await this.onlineService.deleteFromOnline(userId);

    client.broadcast.emit('log', `${userId} disconnected`);
  }
}
