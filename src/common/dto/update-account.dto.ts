import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAccountDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  currency: string;
}
