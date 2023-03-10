import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto, SignUpVerifyDto } from 'src/common';
import { SignUpService } from '../services/sign-up.service';

@Controller('auth/sign-up')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post()
  async signUp(@Body() dto: SignUpDto) {
    return this.signUpService.signUp(dto);
  }

  @Post('verify')
  async verify(@Body() dto: SignUpVerifyDto) {
    return this.signUpService.verify(dto);
  }
}
