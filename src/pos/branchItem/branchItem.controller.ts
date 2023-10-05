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
import { ObjectId } from 'mongoose';
import { IBranchItem } from './branchItem.model';

@Controller('branchItem')
export class QuantityController {
  constructor(private branchItemService: BranchItemService, private readonly s3Service: S3Service) {}

  // @UseGuards(JwtAuthGuard), need to be accessible in front end
  @Get()
  async fillAll(@Query('branch_Id') branch_Id: string, @Query('category_Id') category_Id: string,) {
    const response:IBranchItem[] = await this.branchItemService.findAll(branch_Id, category_Id);
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
  async findOne(@Param('id') id: ObjectId) {
    const response = await this.branchItemService.findOne(id);
    if(response) {
      return {
        ...response,
        photo: await this.s3Service.getFile(response.menuItem.photo) || '',
        title: response.menuItem.title,
        description: response.menuItem.description,
        price: response.menuItem.price,
        
      }
    }
    return []
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  save(@Body() dto: CreateBranchItemDto, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString('utf-8'),
    );
    const user_Id = decodedToken.userPayload.id;
    return this.branchItemService.save(dto, user_Id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateQuantityDto: UpdateBranchItemDto,
  ) {
    return this.branchItemService.update(id, updateQuantityDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.branchItemService.remove(id);
  }
}
