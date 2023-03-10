import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  companyName: string;
}
