import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules/account/account.module';
import { OperationsModule } from './modules/operations/operations.module';
import { RegularPaymentModule } from './modules/regular-payment/regular-payment.module';

@Module({
  imports: [OperationsModule, AccountModule, RegularPaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
