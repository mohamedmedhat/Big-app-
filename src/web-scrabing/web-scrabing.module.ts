import { Module } from '@nestjs/common';
import { WebScrabingService } from './web-scrabing.service';
import { WebScrabingController } from './web-scrabing.controller';

@Module({
  controllers: [WebScrabingController],
  providers: [WebScrabingService],
})
export class WebScrabingModule {}
