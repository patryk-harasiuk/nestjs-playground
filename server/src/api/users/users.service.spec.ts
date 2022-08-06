import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersRepositoryFake } from '../../utils/fakes';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

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

  describe('getting user by email', () => {
    it('throws an error when no user is found', async () => {
      jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(null);

      try {
        await usersService.findOneById(1);
      } catch (error) {
        expect(error.message).toBe('User with this id does not exist')
        expect(error).toBeInstanceOf(HttpException)
      }
    })
  })
  
});
