import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAccountDto, UpdateAccountDto } from 'src/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getAccounts() {
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
