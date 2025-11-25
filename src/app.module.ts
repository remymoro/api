import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma.module';
import { CentersModule } from './modules/centers/centers.module';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
  ],
  imports: [
    PrismaModule,
    CentersModule,
  ],
})
export class AppModule {}
