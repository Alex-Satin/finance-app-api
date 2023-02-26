import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules/account/account.module';
import { OperationsModule } from './modules/operations/operations.module';

@Module({
  imports: [OperationsModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
