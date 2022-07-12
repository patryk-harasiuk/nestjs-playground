import { Controller, Post, Get, Delete, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    console.log(user, 'user');
    // console.log(request.body, 'request body');
    return this.userService.create(user);
  }
}
