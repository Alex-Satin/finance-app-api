import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiPropertyOptional()
  phone?: string;
}
