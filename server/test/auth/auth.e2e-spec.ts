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
      imports: [
        AppModule,
   TypeOrmModule.forFeature([User])
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    userRepository = app.get(getRepositoryToken(User));
    httpServer = app.getHttpServer();
    await app.init();
  });


  afterEach(async () => {
    await userRepository.clear();
  });

  afterAll(async () => {
      await app.close();
  });

  const registeredUserSnapshot = {
    id: expect.any(Number),
    isActive: expect.any(Boolean),
    email: expect.any(String),
    name: expect.any(String)
  }

  describe('POST /auth/register', () => {
    it('should return sanitized user object and create entity in database', async () => {
      const response = await request(httpServer)
        .post('/auth/register')
        .send(mockedUserRegisterData)
        .expect(201);
        
      const id = response.body.id;

      expect(id).toBeDefined();
      expect(response.body).toEqual(registeredUserSnapshot);
    });
  });


  describe('POST /auth/register', () => {
    it('should give an error if user with that email already exists', async () => {
        await request(httpServer).post('/auth/register').send(mockedUserRegisterData).expect(201);

        const secondResponse = await request(httpServer).post('/auth/register').send(mockedUserRegisterData).expect(400);

        expect(secondResponse.body.message).toBe('User with that email already exists')
    })
  })
});