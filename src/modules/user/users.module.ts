import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GoogleDriveProviderModule } from 'src/providers/google-drive';

@Module({
  imports: [GoogleDriveProviderModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
