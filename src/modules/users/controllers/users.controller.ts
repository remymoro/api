import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Req,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  // -------------------------------------------------------------------
  // 🔵 GET ALL
  // -------------------------------------------------------------------
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  // -------------------------------------------------------------------
  // 🔵 GET ONE
  // -------------------------------------------------------------------
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.service.findById(id);
    return user;
  }

  // -------------------------------------------------------------------
  // 🟢 CREATE USER
  // -------------------------------------------------------------------
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.service.create({
      username: dto.username,
      email: dto.email,
      password: dto.password,
      role: dto.role,

      // Connect center only if provided
      center: dto.centerId
        ? { connect: { id: dto.centerId } }
        : undefined,
    });
  }

  // -------------------------------------------------------------------
  // 🟡 UPDATE USER
  // -------------------------------------------------------------------
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.service.update(id, {
      username: dto.username,
      email: dto.email,
      role: dto.role,

      // Si centerId existe → connect
      // Si centerId === null → disconnect
      center:
        dto.centerId !== undefined
          ? dto.centerId === null
            ? { disconnect: true }
            : { connect: { id: dto.centerId } }
          : undefined,
    });
  }

  // -------------------------------------------------------------------
  // 🔴 DELETE USER
  // -------------------------------------------------------------------
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any, // car tu utilises un cookie JWT
  ) {
    const currentUserId = req.user?.id; // Grâce au JwtStrategy

    return this.service.delete(id, currentUserId);
  }
}
  