/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  Res,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  async fillAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findById(+id);
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.usersService.update(+id, updateUserDto);
    return 'Updated';
  }
  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.usersService.remove(+id);
    return 'Deleted!';
  }
}
