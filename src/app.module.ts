import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { databaseConfig, emailsConfig, jwtConfig } from './config';
import { PostgresDatabaseProviderModule } from './providers/database';
import { EmailsProviderModule } from './providers/emails';
import { SERVICES } from './common/services';

import { AccountModule } from './modules/account/account.module';
import { OperationsModule } from './modules/operations/operations.module';
import { RatesModule } from './modules/rates/rates.module';
import { RegularPaymentModule } from './modules/regular-payment/regular-payment.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, emailsConfig, jwtConfig],
    }),
    PostgresDatabaseProviderModule,
    EmailsProviderModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({
      isGlobal: true,
    }),

    OperationsModule,
    AccountModule,
    RegularPaymentModule,
    RatesModule,
    AuthModule,
  ],
  providers: [...SERVICES],
})
export class AppModule {}
