import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { GoogleDriveProviderModule } from 'src/providers/google-drive';
import { PostgresDatabaseProviderModule } from 'src/providers/database';

@Module({
  imports: [GoogleDriveProviderModule, PostgresDatabaseProviderModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
