import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Repository } from 'typeorm';

import { User } from '../../src/api/users/entities/user.entity';
import { AppModule } from '../../src/app.module';
import { mockedUserRegisterData } from '../../src/utils/mocks';

describe('Auth', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let httpServer: unknown;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([User])],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    userRepository = app.get(getRepositoryToken(User));
    httpServer = app.getHttpServer();
  });

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
