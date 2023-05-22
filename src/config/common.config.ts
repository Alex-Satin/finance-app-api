import { registerAs } from '@nestjs/config';

export const commonConfig = registerAs('common', () => ({
  storageServiceUrl: process.env.STORAGE_SERVICE_URL,
  ratesServiceUrl: process.env.RATES_SERVICE_URL,
}));