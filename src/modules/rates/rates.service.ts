import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class RatesService {
  constructor (
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async getRate(buy: string, sell: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.configService.get('common.ratesServiceUrl')}/rates?buy=${buy}&sell=${sell}`,
      ),
    );

    return data
  }
}
