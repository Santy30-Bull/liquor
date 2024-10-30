import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiquorModule } from './liquor/liquor.module';

@Module({
  imports: [LiquorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
