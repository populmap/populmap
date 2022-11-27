import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IdBodyRequestDto {
  @ApiProperty({
    description: 'Id Body',
    examples: {
      'example A': {
        value: {
          id: 'test123',
        },
      },
      'example B': {
        value: {
          id: 'test123@gmail.com',
        },
      },
    },
  })
  @IsString()
  id: string;
}
