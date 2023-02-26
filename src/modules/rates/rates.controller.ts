import { Controller, Query } from '@nestjs/common';
import { RatesService } from './rates.service';

@Controller('rates')
export class RatesController {
  constructor(private readonly reatesService: RatesService) {}

  getRate(@Query('buy') buy: string, @Query('sell') sell: string) {
    return this.reatesService.getRate(buy, sell);
  }
}
