import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoresService } from '../services/stores.service';
import { UpdateStoreDto } from '../dto/update-store.dto';
import { CreateStoreDto } from '../dto/create-store.dto';


@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  create(@Body() dto: CreateStoreDto) {
    return this.storesService.create(dto);
  }

  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStoreDto) {
    return this.storesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
  }
}
