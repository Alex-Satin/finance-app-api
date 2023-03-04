import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { databaseConfig, emailsConfig } from './config';
import { PostgresDatabaseProviderModule } from './providers/database';
import { EmailsProviderModule } from './providers/emails';

import { AccountModule } from './modules/account/account.module';
import { OperationsModule } from './modules/operations/operations.module';
import { RatesModule } from './modules/rates/rates.module';
import { RegularPaymentModule } from './modules/regular-payment/regular-payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, emailsConfig],
    }),
    PostgresDatabaseProviderModule,
    EmailsProviderModule,

    OperationsModule,
    AccountModule,
    RegularPaymentModule,
    RatesModule,
  ],
})
export class AppModule {}
