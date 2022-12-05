import { IsString } from 'class-validator';

export class NewPasswordBodyRequestDto {
  @IsString()
  newPassword: string;
}

export class PasswordBodyRequestDto {
  @IsString()
  password: string;
}
