import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOperationDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  amount?: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  category?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  notes?: string;
}
