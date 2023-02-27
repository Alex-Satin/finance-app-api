import { IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  currency: string;

  @IsUUID()
  userId: string;
}