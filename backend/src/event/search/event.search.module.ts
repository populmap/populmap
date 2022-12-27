import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventSearchController } from './event.search.controller';
import { EventSearchService } from './event.search.service';
import Event from 'src/entities/event.entity';
import { EventRepository } from '../repository/event.repository';
import { EventModule } from '../event.module';

@Module({
  imports: [forwardRef(() => EventModule)],
  providers: [EventSearchService],
  controllers: [EventSearchController],
})
export class EventSearchModule {}
