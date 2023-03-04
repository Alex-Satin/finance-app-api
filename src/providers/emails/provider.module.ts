import { MailerModule } from '@nestjs-modules/mailer/dist';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailsService } from './emails.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: config.get('emails.transport'),
      }),
    }),
  ],
  providers: [EmailsService],
  exports: [MailerModule, EmailsService],
})
export class EmailsProviderModule {}
