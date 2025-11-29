import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateCenterDto } from '../dto/create-center.dto';
import { UpdateCenterDto } from '../dto/update-center.dto';
import { CentersService } from '../services/centers.service';
import { Roles } from '@/modules/auth/decorators/roles.decorator';




@Controller('centers')
export class CentersController {
  constructor(private readonly centersService: CentersService) {}
  
  @Post()
  @Roles('ADMIN')
  create(@Body() data: CreateCenterDto) {
    return this.centersService.create(data);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.centersService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.centersService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCenterDto,
  ) {
    return this.centersService.update(id, data);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.centersService.remove(id);
  }
}
