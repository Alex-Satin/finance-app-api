import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpVerifyDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(6)
  otpCode: string;
}
