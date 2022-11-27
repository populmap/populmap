import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PasswordBodyRequestDto {
  @IsString()
  newPassword: string;
}
