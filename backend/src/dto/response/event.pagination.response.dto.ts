import { ApiProperty } from '@nestjs/swagger';
import { EventListDto } from '../event.list.dto';

export class EventPagiNationResponseDto {
  @ApiProperty({
    description: '행사 리스트',
    type: [EventListDto],
  })
  eventLists: EventListDto[];

  @ApiProperty({
    description: '행사 리스트 총 개수',
    example: 424,
  })
  totalLength: number;
}
