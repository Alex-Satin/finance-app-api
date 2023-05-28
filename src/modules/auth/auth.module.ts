import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { TokensService } from 'src/common/services';
import { PostgresDatabaseProviderModule } from 'src/providers/database';
import { EmailsProviderModule } from 'src/providers/emails';
import { SignInController } from './controllers/sign-in.controller';
import { SignUpController } from './controllers/sign-up.controller';
import { SignInService } from './services/sign-in.service';
import { SignUpService } from './services/sign-up.service';
import { JwtStrategy } from './strategies';


@Module({
  imports: [
    EmailsProviderModule,
    PostgresDatabaseProviderModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [SignUpController, SignInController],
  providers: [SignUpService, TokensService, JwtStrategy, SignInService],
})
export class AuthModule {}
