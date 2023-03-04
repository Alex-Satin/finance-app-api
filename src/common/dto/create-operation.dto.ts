import { IsNumber, IsEnum, IsOptional, IsString } from 'class-validator';
import { OperationType } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOperationDto {
  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsEnum(OperationType)
  @ApiProperty()
  type: OperationType;

  @IsString()
  @ApiProperty()
  category: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  notes?: string;
}
