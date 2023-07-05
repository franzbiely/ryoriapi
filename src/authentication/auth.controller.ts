import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUsersDto } from 'src/general/user/dto/create-users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req);
  }

  @Post('register')
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.authService.create(createUsersDto);
  }
}
