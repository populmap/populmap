import { ApiProperty } from '@nestjs/swagger';
import ProgressType from 'src/enums/progress.type.enum';

export class EventProgressDto {
  @ApiProperty()
  eventId: number;

  @ApiProperty()
  beginTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  progress: ProgressType;
}
