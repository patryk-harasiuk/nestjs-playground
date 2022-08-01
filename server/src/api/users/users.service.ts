import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { UserProperties } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: UserProperties): Promise<User> {
    const newUser = this.userRepository.create(user);

    await this.userRepository.save(newUser);

    return newUser;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user)
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      );

    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findOneById(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user)
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );

    return user;
  }

  async updateUserRefreshToken(
    userId: number,
    updatedRefreshToken: string,
  ): Promise<void> {
    await this.userRepository.update(userId, {
      refreshToken: updatedRefreshToken,
    });
  }

  async removeUserRefreshToken(userId: number) {
    return this.userRepository.update(userId, {
      refreshToken: null
    });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
