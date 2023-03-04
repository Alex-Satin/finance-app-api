import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OperationType } from '../../../../common';
import { Account } from './account.entity';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal' })
  amount: number;

  @Column()
  currency: string;

  @Column({ type: 'enum', enum: OperationType })
  operationType: OperationType;

  @Column({ nullable: true })
  notes?: string;

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
