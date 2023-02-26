import { IsString, IsUUID } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsString()
  currency: string;

  @IsUUID()
  userId: string;
}
