import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Account, CreateAccountDto, UpdateAccountDto } from 'src/common';

@Injectable()
export class AccountService {
  private accounts: Account[] = [];

  getAccounts() {
    return this.accounts;
  }

  getAccount(id: string) {
    const account = this.accounts.find((account) => account.id === id);

    if (!account) {
      throw new NotFoundException(`Can't find account with id ${id}`);
    }

    return account;
  }

  createAccount(dto: CreateAccountDto) {
    const account: Account = {
      ...dto,
      createdAt: new Date(),
      id: uuid(),
    };

    this.accounts.push(account);

    return account;
  }

  updateAccount(id: string, dto: UpdateAccountDto) {
    const accountIndex = this.accounts.findIndex(
      (account) => account.id === id,
    );

    if (accountIndex === -1) {
      throw new NotFoundException(`Can't find account with id ${id}`);
    }

    this.accounts[accountIndex] = {
      ...this.accounts[accountIndex],
      ...dto,
    };

    return this.accounts[accountIndex];
  }

  deleteAccount(id: string) {
    this.accounts = this.accounts.filter((account) => account.id !== id);

    return id;
  }
}
