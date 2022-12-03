import { IsString } from 'class-validator';

export class PasswordBodyRequestDto {
  @IsString()
  newPassword: string;
}
