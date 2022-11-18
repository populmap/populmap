import { IsEmail, IsString } from 'class-validator';

export class UserRegisterRequestDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly userName: string;

  @IsString()
  readonly password: string;
}
