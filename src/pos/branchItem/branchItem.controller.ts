import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';
import { BranchItemService } from './branchItem.service';
import { CreateBranchItemDto } from './dto/create-branchItem.dto';
import { UpdateBranchItemDto } from './dto/update-branchItem.dto';
import { S3Service } from 'src/utils/S3Service';

@Controller('branchItem')
export class QuantityController {
  constructor(private branchItemService: BranchItemService, private readonly s3Service: S3Service) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async fillAll(@Query('branch_Id') branch_Id: number) {
    const response = await this.branchItemService.findAll(branch_Id);
    // @Todo: Refactor and remove other non used properties..
    return await Promise.all(
      response.map(async (item) => {
        return {
          ...item,
          ...item.menuItem,
          photo: await this.s3Service.getFile(item.menuItem.photo),
          
        }
      })
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.branchItemService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createQuantityDto: CreateBranchItemDto, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString('utf-8'),
    );
    console.log({ token });
    return this.branchItemService.create(createQuantityDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuantityDto: UpdateBranchItemDto,
  ) {
    return this.branchItemService.update(+id, updateQuantityDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchItemService.remove(+id);
  }
}
