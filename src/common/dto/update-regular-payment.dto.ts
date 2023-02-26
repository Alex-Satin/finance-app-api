import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { RegularPaymentInterval } from '../enums';

export class UpdateRegularPaymentDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(RegularPaymentInterval)
  @IsOptional()
  interval: RegularPaymentInterval;

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsString()
  @IsOptional()
  currency: string;
}
