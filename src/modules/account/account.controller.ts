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
import { ApiTags } from '@nestjs/swagger';

import {
  CreateAccountDto,
  GetUser,
  JwtAuthGuard,
  UpdateAccountDto,
} from 'src/common';
import { User } from 'src/providers/database';
import { AccountService } from './account.service';

@ApiTags('Acounts')
@UseGuards(JwtAuthGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getAccounts(@GetUser() user: User) {
    return this.accountService.getAccounts(user);
  }

  @Get(':id')
  getAccount(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ) {
    return this.accountService.getAccount(id, user);
  }

  @Post()
  createAccount(@Body() dto: CreateAccountDto, @GetUser() user: User) {
    return this.accountService.createAccount(dto, user);
  }

  @Put(':id')
  updateAccount(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateAccountDto,
    @GetUser() user: User,
  ) {
    return this.accountService.updateAccount(id, dto, user);
  }

  @Delete(':id')
  deleteAccount(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ) {
    return this.accountService.deleteAccount(id, user);
  }
}
