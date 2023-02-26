import { Module } from '@nestjs/common';
import { RegularPaymentService } from './regular-payment.service';
import { RegularPaymentController } from './regular-payment.controller';

@Module({
  providers: [RegularPaymentService],
  controllers: [RegularPaymentController],
})
export class RegularPaymentModule {}
