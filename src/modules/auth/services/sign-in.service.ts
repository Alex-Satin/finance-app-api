import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as randomstring from 'randomstring';
import { Cache } from 'cache-manager';

import { User } from 'src/providers/database';
import { RefreshTokenDto, SignInDto, SignInVerifyDto } from 'src/common';
import { TokensService } from 'src/common/services';
import { ClientProxy } from '@nestjs/microservices';

const SIGN_IN_CACHE_PREFIX = 'sign-in-otp';

@Injectable()
export class SignInService {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,

    @Inject('EMAILS_SERVICE')
    private readonly emailsService: ClientProxy,

    private readonly tokensService: TokensService,
  ) {}

  async signIn(dto: SignInDto) {
    const user = await this.userRepository.findOneBy({ email: dto.email });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const passwordCorrect = await bcrypt.compare(
      dto.password,
      user.hashedPassword,
    );

    if (!passwordCorrect) {
      throw new BadRequestException('Invalid credentials');
    }

    await this.startVerification(dto.email);

    return {
      message: `Otp code has been sent to ${dto.email}`,
    };
  }

  async verify(dto: SignInVerifyDto) {
    const codeFromCache = await this.cache.get(
      `${SIGN_IN_CACHE_PREFIX}:${dto.email}`,
    );

    if (codeFromCache !== dto.otpCode) {
      throw new BadRequestException('Code invalid or expired');
    }

    const user = await this.userRepository.findOneBy({ email: dto.email });

    await this.cache.del(`${SIGN_IN_CACHE_PREFIX}:${dto.email}`);

    return {
      accessToken: this.tokensService.generateAccessToken(user),
      refreshToken: this.tokensService.generateRefreshToken(user),
    };
  }

  async refreshToken(dto: RefreshTokenDto) {
    return this.tokensService.refreshTokens(dto.refreshToken);
  }

  private async startVerification(email: string) {
    const otpCode = randomstring.generate({
      charset: 'numeric',
      length: 6,
    });

    await this.cache.set(
      `${SIGN_IN_CACHE_PREFIX}:${email}`,
      otpCode,
      60 * 3 * 1000,
    );

    this.emailsService.emit('send-email', {
      to: email,
      subject: 'Verify otp',
      text: `Your otp code is: ${otpCode}. Note code is available 3 minutes`,
    });
  }
}
