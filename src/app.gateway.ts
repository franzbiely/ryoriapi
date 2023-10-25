import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketService } from './utils/socket/socket.service';

@WebSocketGateway({cors: true})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private socketService: SocketService){

  }
  @WebSocketServer() public server: Server;
  private logger: Logger = new Logger('AppGateway');


  afterInit(server: Server) {
    this.socketService.socket = server;
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('order.new')
  handleMessage(@MessageBody() data: any): void {
    console.log(`Recieved socket message from `)
    this.socketService.socket.socketsJoin('sc-channel-' + data.branch_Id);
    this.socketService.socket.in('sc-channel-' + data.branch_Id).emit('message', {
      title: data.title,
      message: data.message,
      channelId: 'sc-channel-' + data.branch_Id
    });
  }
}