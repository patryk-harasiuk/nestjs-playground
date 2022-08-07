import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';
import { UpdateResult } from 'typeorm';

import { User } from './entities/user.entity';
import { UserProperties } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async create(user: UserProperties): Promise<User> {
    const newUser = this.usersRepository.create(user);

    const savedUser = await this.usersRepository.save(newUser);

    return savedUser;
  }

  public async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user)
      throw new HttpException(
        'User with that email does not exist',
        HttpStatus.NOT_FOUND,
      );

    return user;
  }

  public async findOneById(userId: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user)
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );

    return user;
  }

  public async updateUserRefreshToken(
    userId: number,
    updatedRefreshToken: string,
  ): Promise<void> {
    await this.usersRepository.update(userId, {
      refreshToken: updatedRefreshToken,
    });
  }

  public async removeUserRefreshToken(userId: number): Promise<void> {
    this.usersRepository.update(userId, {
      refreshToken: null,
    });
  }

  public async getUserIfRefreshTokenMatches(
    userId: number,
    refreshToken: string,
  ): Promise<User> {
    const user = await this.findOneById(userId);

    if (!user.refreshToken)
      throw new HttpException('Access Denied', HttpStatus.BAD_REQUEST);

    const isRefreshTokenMatching = await bcryptjs.compare(
      refreshToken,
      user.refreshToken,
    );

    if (isRefreshTokenMatching) return user;

    throw new HttpException('Access Denied', HttpStatus.BAD_REQUEST);
  }
}
