import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOperationDto {
  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
