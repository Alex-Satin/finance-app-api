import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OperationType } from '../../../../common';
import { Category } from './category.entity';
import { Account } from './account.entity';
import { User } from './user.entity';

@Entity()
export class RegularPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  isEnabled: boolean;

  @Column({ type: 'decimal' })
  amount: number;

  @Column()
  currency: string;

  @Column({ type: 'enum', enum: OperationType })
  operationType: string;

  @Column({ type: 'simple-json', nullable: true })
  notes?: { [key: string]: any };

  @ManyToOne(() => Account, (account) => account.id)
  account: Account;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
