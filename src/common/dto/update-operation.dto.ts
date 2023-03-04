import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOperationDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  category?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  notes?: string;
}
