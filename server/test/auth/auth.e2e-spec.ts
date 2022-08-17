import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getConnectionToken, getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Repository } from 'typeorm';

import { User } from '../../src/api/users/entities/user.entity';
import { AppModule } from '../../src/app.module';
import { defaultDBConfig } from '../../src/config';
import { mockedUserRegisterData } from '../../src/utils/mocks';

describe('Auth', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let httpServer: unknown;
  const configService = new ConfigService();

  console.log(configService.get('DATABASE_NAME_TEST'), 'OSCYP');

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
     
        
     
            ...defaultDBConfig,
            // type: 'postgres',
            // port: configService.get('DATABASE_PORT'),
            // host: configService.get('HOST'),
            // username: configService.get('DATABASE_USER'),
            // password:  configService.get<string>('POSTGRES_PASSWORD') || '',
            // database: configService.get('DATABASE_NAME'),
            synchronize: true,
            // name: configService.get('DATABASE_NAME_TEST'),§
            autoLoadEntities: true,
        }),
      
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    userRepository = moduleRef.get(getConnectionToken());
    await app.init();

    httpServer = app.getHttpServer();
  });

  console.log(process.env.NODE_ENV, 'GAMING EXPERIENCE MIX 3000');

  afterEach(async () => {
    await userRepository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('when creating a user', () => {
    it('should return sanitized user object and create entity in database', async () => {
      const response = await request(httpServer)
        .post('/auth/register')
        .send(mockedUserRegisterData)
        .expect(201);

      const uuid = response.body.uuid;

      expect(uuid).toBeDefined();
    });
  });
});
