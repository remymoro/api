import { Module } from '@nestjs/common';
import { CentersController } from './controllers/centers.controller';
import { CentersService } from './services/centers.service';
@Module({
  controllers: [CentersController],
  providers: [CentersService],
})
export class CentersModule {}
