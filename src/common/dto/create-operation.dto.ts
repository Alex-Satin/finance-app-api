import { IsNumber, IsEnum, IsOptional, IsString } from 'class-validator';
import { OperationType } from '../enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOperationDto {
  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsEnum(OperationType)
  @ApiProperty({enum: OperationType})
  type: OperationType;

  @IsString()
  @ApiProperty()
  category: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  notes?: string;
}
