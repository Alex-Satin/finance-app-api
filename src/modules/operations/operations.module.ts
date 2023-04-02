import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { PostgresDatabaseProviderModule } from 'src/providers/database';

@Module({
  imports: [PostgresDatabaseProviderModule],
  providers: [OperationsService],
  controllers: [OperationsController],
})
export class OperationsModule {}
