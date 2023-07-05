import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async fillAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString('utf-8'),
    );
    console.log('Userzzzz:', decodedToken);
    const user_Id = decodedToken.userPayload.id;

    return this.usersService.findOneId(+user_Id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOneId(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
