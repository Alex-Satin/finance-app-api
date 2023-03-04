import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { RegularPaymentInterval } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRegularPaymentDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsEnum(RegularPaymentInterval)
  @IsOptional()
  @ApiProperty()
  interval: RegularPaymentInterval;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  amount: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  currency: string;
}
