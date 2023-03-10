import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import {
  CreateAccountDto,
  GetUser,
  JwtAuthGuard,
  UpdateAccountDto,
} from 'src/common';
import { User } from 'src/providers/database';
import { AccountService } from './account.service';

@UseGuards(JwtAuthGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getAccounts(@GetUser() user: User) {
    console.log(JSON.stringify(user));
    return this.accountService.getAccounts();
  }

  @Get(':id')
  getAccount(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.accountService.getAccount(id);
  }

  @Post()
  createAccount(@Body() dto: CreateAccountDto) {
    return this.accountService.createAccount(dto);
  }

  @Put(':id')
  updateAccount(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateAccountDto,
  ) {
    return this.accountService.updateAccount(id, dto);
  }

  @Delete(':id')
  deleteAccount(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.accountService.deleteAccount(id);
  }
}
