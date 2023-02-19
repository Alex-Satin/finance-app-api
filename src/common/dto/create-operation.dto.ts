import { IsNumber, IsEnum, IsOptional, IsString } from 'class-validator';
import { OperationType } from '../enums';

export class CreateOperationDto {
  @IsNumber()
  amount: number;

  @IsEnum(OperationType)
  type: OperationType;

  @IsString()
  category: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
