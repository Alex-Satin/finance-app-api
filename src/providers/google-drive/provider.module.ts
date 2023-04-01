import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GoogleDriveService } from './google-drive.service';

@Module({
  imports: [HttpModule],
  providers: [GoogleDriveService],
  exports: [GoogleDriveService],
})
export class GoogleDriveProviderModule {}
