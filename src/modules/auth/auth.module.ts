import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { TokensService } from 'src/common/services';
import { PostgresDatabaseProviderModule } from 'src/providers/database';
import { EmailsProviderModule } from 'src/providers/emails';
import { SignUpController } from './controllers/sign-up.controller';
import { SignUpService } from './services/sign-up.service';

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
  ],
  controllers: [SignUpController],
  providers: [SignUpService, TokensService],
})
export class AuthModule {}
