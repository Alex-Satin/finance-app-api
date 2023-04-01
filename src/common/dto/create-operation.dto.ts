import {
  IsNumber,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { OperationType } from '../enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOperationDto {
  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsEnum(OperationType)
  @ApiProperty({ enum: OperationType })
  type: OperationType;

  @IsUUID()
  @ApiProperty()
  categoryId: string;

  @IsUUID()
  @ApiProperty()
  accountId: string;

  @IsString()
  @ApiProperty()
  currencyCode: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  notes?: string;
}
