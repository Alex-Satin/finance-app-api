import { RegularPaymentInterval } from '../enums';

export interface RegularPayment {
  name: string;
  interval: RegularPaymentInterval;
  amount: number;
  currency: string;
  accountId: string;
  userId: string;
  createdAt: Date;
  id: string;
}
