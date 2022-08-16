import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return process.env.NODE_ENV === 'test'
      ? {
          type: 'postgres',
          host: this.config.get<string>('HOST'),
          port: this.config.get<number>('DATABASE_PORT'),
          database: this.config.get<string>('DATABASE_NAME_TESTS'),
          username: this.config.get<string>('DATABASE_USER_TESTS'),
          password: this.config.get<string>('POSTGRES_PASSWORD_TESTS'),
          migrations: ['dist/migrations/*.{ts,js}'],
          migrationsTableName: 'typeorm_migrations',
          autoLoadEntities: true,
          logger: 'file',
        }
      : {
          type: 'postgres',
          host: this.config.get<string>('HOST'),
          port: this.config.get<number>('DATABASE_PORT'),
          database: this.config.get<string>('DATABASE_NAME'),
          username: this.config.get<string>('DATABASE_USER'),
          password: this.config.get<string>('POSTGRES_PASSWORD'),
          migrations: ['dist/migrations/*.{ts,js}'],
          migrationsTableName: 'typeorm_migrations',
          autoLoadEntities: true,
          logger: 'file',
          synchronize: true,
        };
  }
}
