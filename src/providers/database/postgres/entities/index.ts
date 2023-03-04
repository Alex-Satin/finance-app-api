import { Account } from './account.entity';
import { Category } from './category.entity';
import { Operation } from './operation.entity';
import { RegularPayment } from './regular-payment.entity';
import { User } from './user.entity';

export * from './account.entity';
export * from './category.entity';
export * from './operation.entity';
export * from './regular-payment.entity';
export * from './user.entity';

export const ENTITIES = [Account, Category, Operation, RegularPayment, User];
