import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITIES } from './entities';
import { MIGRATIONS } from './migrations';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        ...config.get('database.postgres'),
        entities: [...ENTITIES],
        migrations: [...MIGRATIONS],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([...ENTITIES]),
  ],
  exports: [TypeOrmModule],
})
export class PostgresDatabaseProviderModule {}
