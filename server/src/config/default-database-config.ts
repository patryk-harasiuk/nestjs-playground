import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const configService = new ConfigService();

export const defaultDBConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: +configService.get('DATABASE_PORT'),
  host: configService.get('HOST'),
  username: configService.get('DATABASE_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  synchronize: true,
};
