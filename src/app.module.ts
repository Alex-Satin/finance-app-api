import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { databaseConfig } from './config';
import { PostgresDatabaseProviderModule } from './providers/database';

import { AccountModule } from './modules/account/account.module';
import { OperationsModule } from './modules/operations/operations.module';
import { RatesModule } from './modules/rates/rates.module';
import { RegularPaymentModule } from './modules/regular-payment/regular-payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    PostgresDatabaseProviderModule,

    OperationsModule,
    AccountModule,
    RegularPaymentModule,
    RatesModule,
  ],
})
export class AppModule {}
