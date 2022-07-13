import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserProperties } from './user.interface';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async create(user: UserProperties): Promise<User> {
    if (await this.checkIsUserUnique(user.email)) {
      throw new HttpException(
        { message: 'User with that email already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await this.hashPassword(user.password);

    return await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  private async checkIsUserUnique(email: string): Promise<boolean> {
    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    return !!user;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
}
