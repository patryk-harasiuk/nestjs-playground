import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../api/users/entities/user.entity';
import { UsersService } from '../api/users/users.service';
import { mockedConfigService, mockedJwtService } from '../utils/mocks';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('when creating a cookie', () => {
    it('should return a string', async () => {
      const userId = 1;
      const userEmail = 'test@test.com';
      expect(
        typeof (await authService.createAccessTokenCookie(userId, userEmail)),
      ).toEqual('string');
    });
  });
});
