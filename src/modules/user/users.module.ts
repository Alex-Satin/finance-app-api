import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { PostgresDatabaseProviderModule } from 'src/providers/database';

@Module({
  imports: [PostgresDatabaseProviderModule, HttpModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
