import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CentersModule } from './modules/centers/centers.module';
import { StoresModule } from './modules/stores/stores.module';
import { PrismaModule } from './database/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';

@Module({
  imports: [
    // 1️⃣ ALWAYS FIRST
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2️⃣ PASSPORT AVANT AUTHMODULE
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),

    // 3️⃣ LE RESTE
    PrismaModule,
    AuthModule,
    UsersModule,
    CentersModule,
    StoresModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,        // Auth d'abord
  },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,          // Puis le rôle
    },
  ],
})
export class AppModule {}
