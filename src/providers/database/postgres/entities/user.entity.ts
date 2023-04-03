import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserStatus } from '../../../../common';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.UNVERIFIED })
  status: UserStatus;

  @Column({ unique: true })
  email: string;

  @Column()
  hashedPassword: string;

  @Column()
  phone: string;

  @Column()
  companyName: string;

  @Column()
  profileImageId: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
