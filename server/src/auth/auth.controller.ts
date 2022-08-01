import {
  Controller,
  Req,
  Post,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
  Body,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import RequestWithUser from './interfaces/request-with-user.interface';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() request: RequestWithUser) {
    const { user } = request;

    return this.authService.login(user.id, user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: RequestWithUser, @Res() response: Response) {
    console.log('logout');

    response.setHeader('Set-Cookie', this.authService.logout());
    return response.sendStatus(200);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() req) {
    console.log('refresh token');
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    // #TODO: create method like sanitizeUser for clearing user object
    const { password, ...user } = request.user;

    return user;
  }
}
