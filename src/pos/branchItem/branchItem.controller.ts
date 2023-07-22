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

  // @UseGuards(JwtAuthGuard), need to be accessible in front end
  @Get()
  async fillAll(@Query('branch_Id') branch_Id: number, @Query('category_Id') category_Id: number,) {
    const response = await this.branchItemService.findAll(branch_Id, category_Id);
    // @Todo: Refactor and remove other non used properties..
    return await Promise.all(
      response.map(async (item) => {
        return {
          ...item,
          ...item.menuItem,
          photo: await this.s3Service.getFile(item.menuItem.photo) || '',
          
        }
      })
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const response = await this.branchItemService.findOne(+id);
    return {
      ...response,
      photo: await this.s3Service.getFile(response.menuItem.photo) || '',
      title: response.menuItem.title,
      description: response.menuItem.description,
      price: response.menuItem.price,
      
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  save(@Body() dto: CreateBranchItemDto, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString('utf-8'),
    );
    console.log({ token });
    return this.branchItemService.save(dto);
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
