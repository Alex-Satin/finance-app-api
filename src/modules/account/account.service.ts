import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAccountDto, UpdateAccountDto } from 'src/common';
import { Account, User } from 'src/providers/database';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  getAccounts(user: User): Promise<Account[]> {
    return this.accountRepository.findBy({
      user: { id: user.id },
    });
  }

  async getAccount(id: string, user: User): Promise<Account> {
    const account = await this.accountRepository.findOneBy({
      id,
      user: { id: user.id },
    });

    if (!account) {
      throw new NotFoundException(`Can't find account with id ${id}`);
    }

    return account;
  }

  async createAccount(dto: CreateAccountDto, user: User): Promise<Account> {
    const account = this.accountRepository.create({
      name: dto.name,
      currency: dto.currency,
      user,
    });

    try {
      await this.accountRepository.save(account);
    } catch (err) {
      throw new BadRequestException('Ivalid account configuration');
    }

    return account;
  }

  async updateAccount(
    id: string,
    dto: UpdateAccountDto,
    user: User,
  ): Promise<Account> {
    const account = await this.accountRepository.findOneBy({
      id,
      user: { id: user.id },
    });

    if (!account) {
      throw new NotFoundException(`Can't find account with id ${id}`);
    }

    const updatedAccount = await this.accountRepository.save(
      this.accountRepository.merge(account, dto),
    );

    return updatedAccount;
  }

  async deleteAccount(id: string, user: User) {
    await this.accountRepository.delete({ id, user: { id: user.id } });

    return id;
  }
}
