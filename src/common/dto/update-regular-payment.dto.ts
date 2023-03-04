import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { RegularPaymentInterval } from '../enums';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRegularPaymentDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name: string;

  @IsEnum(RegularPaymentInterval)
  @IsOptional()
  @ApiPropertyOptional({enum: RegularPaymentInterval})
  interval: RegularPaymentInterval;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  amount: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  currency: string;
}
