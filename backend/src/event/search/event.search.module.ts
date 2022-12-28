import { Module, forwardRef } from '@nestjs/common';
import { EventSearchController } from './event.search.controller';
import { EventSearchService } from './event.search.service';
import { EventModule } from '../event.module';

@Module({
  imports: [forwardRef(() => EventModule)],
  providers: [EventSearchService],
  controllers: [EventSearchController],
})
export class EventSearchModule {}
