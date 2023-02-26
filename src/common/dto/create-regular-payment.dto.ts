import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { RegularPaymentInterval } from '../enums';

export class CreateRegularPaymentDto {
  @IsString()
  name: string;

  @IsEnum(RegularPaymentInterval)
  interval: RegularPaymentInterval;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsUUID()
  accountId: string;

  @IsUUID()
  userId: string;
}
