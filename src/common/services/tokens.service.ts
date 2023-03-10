import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/providers/database';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  generateAccessToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    const options: JwtSignOptions = { expiresIn: '15m' };
    return this.jwtService.sign(payload, options);
  }

  generateRefreshToken(user: User) {
    const payload = { sub: user.id };
    const options = { expiresIn: '7d' };
    return this.jwtService.sign(payload, options);
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);

      const user = await this.userRepository.findOneBy({ id: payload.sub });

      const accessToken = this.generateAccessToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
