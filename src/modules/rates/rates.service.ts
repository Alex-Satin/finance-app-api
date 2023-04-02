import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class RatesService {
  getRate(buy: string, sell: string) {
    if (!buy || !sell) {
      throw new BadRequestException('You should provide buy and sell params');
    }

    if (buy === sell) {
      return {
        rate: 1,
      };
    }

    return {
      rate: Math.random(),
    };
  }
}
