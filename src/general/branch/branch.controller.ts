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
  Query,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';

@Controller('branch')
export class BranchController {
  constructor(private branchService: BranchService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async fillAll(@Query('store_Id') store_Id: number) {
    return this.branchService.findAll(store_Id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Query('store_Id') store_Id: number) {
    return this.branchService.findOneId(store_Id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBranchDto: CreateBranchDto, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString('utf-8'),
    );
    const user_Id = decodedToken.userPayload.id;
    createBranchDto.user_Id = user_Id;
    return this.branchService.create(createBranchDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchService.update(+id, updateBranchDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchService.remove(+id);
  }
}
