import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RatesController } from './rates.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [RatesService],
  controllers: [RatesController],
  imports: [HttpModule]
})
export class RatesModule {}
