import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto, SignInVerifyDto } from 'src/common';
import { RefreshTokenDto } from 'src/common/dto/refresh-token.dto';
import { SignInService } from '../services/sign-in.service';

@ApiTags('Sign in')
@Controller('auth/sign-in')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post()
  async signIn(@Body() dto: SignInDto) {
    return this.signInService.signIn(dto);
  }

  @Post('verify')
  async verify(@Body() dto: SignInVerifyDto) {
    return this.signInService.verify(dto);
  }

  @Post('refresh')
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return this.signInService.refreshToken(dto);
  }
}
