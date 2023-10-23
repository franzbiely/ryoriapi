import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, WsResponse } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({cors: true})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private socketService: SocketService){

  }
  @WebSocketServer() public server: Server;
  private logger: Logger = new Logger('SocketGateway');


  afterInit(server: Server) {
    this.socketService.socket = server;
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('join-channel-branch')
  joinChannelBranch(@MessageBody() data: any): void {
    this.socketService.socket.socketsJoin(`channel-branch-${data.branch_Id}`);
    this.socketService.socket.emit('join-channel-branch-response', `{"success": true}`);
  }

  @SubscribeMessage('detach-channel-branch')
  detachChannelBranch(@MessageBody() data: any) {
    this.socketService.socket.socketsLeave(`channel-branch-${data.branch_Id}`);
    this.socketService.socket.emit(`detach-channel-branch-response`, `{"success": true}`);
  }

  @SubscribeMessage('message-to-branch')
  messageToBranch(@MessageBody() data: any) {
    this.socketService.socket.emit('message-to-branch', {
      title: data.title,
      message: data.message
    });
    this.socketService.socket.emit('message-to-branch-response', `{"success": true}`);
  }

  @SubscribeMessage('message-to-customer')
  messageToCustomer() {
    this.socketService.socket.emit('message-to-customer', { update : true });
    this.socketService.socket.emit('message-to-customer-response', `{"success": true}`);
  }
}