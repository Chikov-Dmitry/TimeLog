import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import {
  IClientToServerEvents,
  IServerToClientEvents,
} from '@timelog/interfaces';
import { AtWorkService } from './at-work.service';
import { UserAtWorkDto } from '@timelog/interfaces/src/socket/UserAtWorkDto';
import { forwardRef, Inject } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AtWorkGateway {
  constructor(
    @Inject(forwardRef(() => AtWorkService))
    private readonly atWorkService: AtWorkService,
  ) {}

  @WebSocketServer()
  server: Server<IClientToServerEvents, IServerToClientEvents>;

  @SubscribeMessage('getAtWorkList')
  async getAtWorkList(): Promise<UserAtWorkDto> {
    this.server.emit('atWorkList', await this.atWorkService.getAtWorkList());
    return await this.atWorkService.getAtWorkList();
  }
}
