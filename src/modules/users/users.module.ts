import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { PrismaService } from '@/database/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService, // 🔥 nécessaire si Prisma n'est pas global
  ],
  exports: [UsersService], // 🔥 utilisé par AuthModule
})
export class UsersModule {}
