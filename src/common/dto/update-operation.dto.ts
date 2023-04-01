import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { OperationType } from '../enums';

export class UpdateOperationDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  amount?: number;

  @IsEnum(OperationType)
  @ApiPropertyOptional({ enum: OperationType })
  type?: OperationType;

  @IsUUID()
  @ApiPropertyOptional()
  categoryId?: string;

  @IsUUID()
  @ApiPropertyOptional()
  accountId?: string;

  @IsString()
  @ApiPropertyOptional()
  currencyCode?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  notes?: string;
}
