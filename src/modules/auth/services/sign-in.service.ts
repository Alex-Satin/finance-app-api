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
  import { EmailsService } from 'src/providers/emails';
  import { SignInDto, SignInVerifyDto, UserStatus } from 'src/common';
  import { TokensService } from 'src/common/services';
  
  const REGISTER_IN_CACHE_PREFIX = 'register-otp';
  
  @Injectable()
  export class SignInService {
    private readonly logger = new Logger();
  
    constructor(
      @InjectRepository(User)
      private readonly userRespository: Repository<User>,
  
      @Inject(CACHE_MANAGER)
      private readonly cache: Cache,
  
      private readonly emailsService: EmailsService,
      private readonly tokensService: TokensService,
    ) {}
  
    async signIn(dto: SignInDto) {
      const existing = await this.userRespository.findOneBy({ email: dto.email });
  
      if (!existing) {
        throw new BadRequestException('User is already exists');
      }
  
      await this.startVerification(dto.email);
  
      return {
        message: `Otp code has been sent to ${dto.email}`,
      };
    }
  
    async verify(dto: SignInVerifyDto) {
      const codeFromCache = await this.cache.get(
        `${REGISTER_IN_CACHE_PREFIX}:${dto.email}`,
      );
  
      if (codeFromCache !== dto.otpCode) {
        throw new BadRequestException('Code invalid or expired');
      }
  
      const user = await this.userRespository.findOneBy({ email: dto.email });
  
      user.status = UserStatus.ACTIVE;
  
      await this.userRespository.save(user);
  
      await this.cache.del(`${REGISTER_IN_CACHE_PREFIX}:${dto.email}`);
  
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
        `${REGISTER_IN_CACHE_PREFIX}:${email}`,
        otpCode,
        60 * 3 * 1000,
      );
  
      await this.emailsService.sendEmail({
        to: email,
        subject: 'Verify otp',
        text: `Your otp code is: ${otpCode}. Note code is available 3 minutes`,
      });
    }
  }
  