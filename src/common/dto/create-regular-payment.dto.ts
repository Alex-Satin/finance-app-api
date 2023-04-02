import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { RegularPaymentInterval } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRegularPaymentDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEnum(RegularPaymentInterval)
  @ApiProperty({enum:RegularPaymentInterval})
  interval: RegularPaymentInterval;

  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsString()
  @ApiProperty()
  currency: string;

  @IsUUID()
  accountId: string;

  @IsUUID()
  @ApiProperty()
  userId: string;
}
