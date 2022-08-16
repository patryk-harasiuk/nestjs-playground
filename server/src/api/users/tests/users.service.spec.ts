import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersRepositoryFake } from '../../../utils/fakes';
import { User } from '../entities/user.entity';
import { UserProperties } from '../interfaces';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useClass: UsersRepositoryFake },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  describe('getting user', () => {
    it('throws an error when no user is found', async () => {
      const userId = 1;

      jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(null);

      try {
        await usersService.findOneById(userId);
      } catch (error) {
        expect(error.message).toBe('User with this id does not exist');
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('creating a user', () => {
    it('calls the repository with correct parameters', async () => {
      const createUserData: UserProperties = {
        name: 'test',
        password: 'password',
        email: 'test@test.pl',
      };

      const createdUserEntity = {
        ...createUserData,
        id: 1,
        isActive: true,
        refreshToken: null,
      };

      const usersRepositoryCreateSpy = jest
        .spyOn(usersRepository, 'create')
        .mockReturnValue(createUserData as User);

      jest.spyOn(usersRepository, 'save').mockResolvedValue(createdUserEntity);

      const result = await usersService.create(createUserData);

      expect(usersRepositoryCreateSpy).toBeCalledWith(createUserData);
      expect(result).toEqual(createdUserEntity);
    });
  });
});
