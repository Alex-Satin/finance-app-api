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
import { SignUpDto, SignUpVerifyDto, UserStatus } from 'src/common';
import { TokensService } from 'src/common/services';
import { ClientProxy } from '@nestjs/microservices';

const REGISTER_CACHE_PREFIX = 'register-otp';

@Injectable()
export class SignUpService {
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

  async signUp(dto: SignUpDto) {
    const existing = await this.userRepository.findOneBy({ email: dto.email });

    if (existing) {
      throw new BadRequestException('User is already exists');
    }

    const user = this.userRepository.create();

    user.email = dto.email;
    user.phone = dto.phone;
    user.companyName = dto.companyName;

    user.hashedPassword = await bcrypt.hash(dto.password, 10);

    await this.userRepository.save(user);

    await this.startVerification(dto.email);

    return {
      message: `Otp code has been sent to ${dto.email}`,
    };
  }

  async verify(dto: SignUpVerifyDto) {
    const codeFromCache = await this.cache.get(
      `${REGISTER_CACHE_PREFIX}:${dto.email}`,
    );

    if (codeFromCache !== dto.otpCode) {
      throw new BadRequestException('Code invalid or expired');
    }

    const user = await this.userRepository.findOneBy({ email: dto.email });

    user.status = UserStatus.ACTIVE;

    await this.userRepository.save(user);

    await this.cache.del(`${REGISTER_CACHE_PREFIX}:${dto.email}`);

    return {
      accessToken: this.tokensService.generateAccessToken(user),
      refreshToken: this.tokensService.generateRefreshToken(user),
    };
  }

  private async startVerification(email: string) {
    const otpCode = randomstring.generate({
      charset: 'numeric',
      length: 6,
    });

    await this.cache.set(
      `${REGISTER_CACHE_PREFIX}:${email}`,
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
