import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventSearchController } from './event.search.controller';
import { EventSearchService } from './event.search.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Event]),
  ],
  providers: [EventSearchService],
  controllers: [EventSearchController],
})
export class EventSearchModule {}
