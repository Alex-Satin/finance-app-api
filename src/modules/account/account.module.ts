import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { PostgresDatabaseProviderModule } from 'src/providers/database';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  imports: [PassportModule, PostgresDatabaseProviderModule],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
