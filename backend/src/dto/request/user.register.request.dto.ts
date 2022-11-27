import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterRequestDto {
  @ApiProperty({
    description: '회원가입 폼',
    example: {
      email: 'test123@naver.com',
      userName: 'test123',
      password: 'test123!@',
    },
  })
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly userName: string;

  @IsString()
  readonly password: string;
}
