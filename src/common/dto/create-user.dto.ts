import { IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  currency: string;

  @IsUUID()
  userId: string;
}