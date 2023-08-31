import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Encryptor } from './utils/encryptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly encryptor: Encryptor) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/encrypt/:str')
  async encrypt(@Param('str') str: string): Promise<string> {
    return await this.encryptor.encrypt(str)
  }

  @Get('/decrypt/:str')
  async decrypt(@Param('str') str: string): Promise<string> {
    return await this.encryptor.decrypt(str)
  }
}
