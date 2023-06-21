import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  Res,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get()
  async fillAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.storeService.findOneId(+id);
  }

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    this.storeService.update(+id, updateStoreDto);
    return 'Updated';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.storeService.remove(+id);
    return 'Deleted!';
  }
}
