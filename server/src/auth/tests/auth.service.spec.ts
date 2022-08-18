import { HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from 'src/api/users/users.service';
import { UsersRepositoryFake } from 'src/utils/fakes';
import { Repository } from 'typeorm';

import { User } from '../../api/users/entities/user.entity';
import {
  mockedConfigService,
  mockedJwtService,
  mockedUser,
  mockedUserRegisterData,
} from '../../utils/mocks';
import { AuthService } from '../auth.service';
import { UserProperties } from '../interfaces';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let usersRepository: Repository<User>;
  let userData: User;
  let userRegisterData: UserProperties;
  let bcryptCompare: jest.Mock;

  beforeEach(async () => {
    bcryptCompare = jest.fn().mockRejectedValue(true);
    (bcryptjs.compare as jest.Mock) = bcryptCompare;

    userData = mockedUser;
    userRegisterData = mockedUserRegisterData;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: UsersRepositoryFake,
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
    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  describe('when creating a cookie', () => {
    it('should return a string', async () => {
      expect(
        typeof (await authService.createAccessTokenCookie(
          userData.id,
          userData.email,
        )),
      ).toEqual('string');
    });
  });

  describe('when loggin in', () => {
    it('should return pair of cookies', async () => {
      jest
        .spyOn(usersRepository, 'update')
        .mockImplementationOnce(() => Promise.resolve() as any);
      const result = await authService.login(userData.id, userData.email);

      expect(result).toHaveProperty('accessTokenCookie');
      expect(result).toHaveProperty('refreshTokenCookie');
    });
  });

  describe('when accessing the data of authenticating user', () => {
    beforeEach(() => {
      jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(userData);
    });
    it('should call findOneByEmail function and return user data', async () => {
      const usersServiceFindOneByEmailSpy = jest.spyOn(
        usersService,
        'findOneByEmail',
      );

      bcryptCompare.mockReturnValue(true);

      const result = await authService.validateUser(
        userData.email,
        userData.password,
      );

      expect(usersServiceFindOneByEmailSpy).toBeCalledTimes(1);
      expect(result).toEqual(userData);
    });

    it('should throw if user password is wrong', async () => {
      bcryptCompare.mockReturnValue(false);

      try {
        await authService.validateUser(userData.email, userData.password);
      } catch (error) {
        expect(error.message).toBe('Wrong credentials provided');
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('when registering', () => {
    beforeEach(() => {
      jest.clearAllMocks;
    });
    it('should call create method and return created user', async () => {
      const createdUser: User = {
        ...userRegisterData,
        id: 1,
        refreshToken: null,
        isActive: true,
      };

      const usersRepositoryCreateSpy = jest
        .spyOn(usersRepository, 'create')
        .mockReturnValue(userRegisterData as any);

      const usersRepositorySaveSpy = jest
        .spyOn(usersRepository, 'save')
        .mockResolvedValue(createdUser);

      const result = await authService.register(userRegisterData);

      expect(usersRepositoryCreateSpy).toBeCalledTimes(1);
      expect(usersRepositorySaveSpy).toBeCalledTimes(1);
      expect(result).toEqual(createdUser);
    });
  });
});
