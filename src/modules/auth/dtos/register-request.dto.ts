import { UserRole } from '@prisma/client';
import { IsEnum, IsString, IsOptional, IsInt } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsInt()
  centerId?: number;

  @IsOptional()
  @IsString()
  email?: string;
}
