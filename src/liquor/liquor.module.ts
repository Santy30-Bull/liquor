import { Module } from '@nestjs/common';
import { LiquorService } from './liquor.service';
import { LiquorController } from './liquor.controller';

@Module({
  controllers: [LiquorController],
  providers: [LiquorService],
})
export class LiquorModule {}
