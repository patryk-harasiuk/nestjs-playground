/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/api/users/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { User } from 'src/api/users/entities/user.entity';
import { Tokens } from './interfaces/auth.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { UserProperties } from 'src/api/users/interfaces/user.interface';
import { PostgresErrorCode } from 'src/shared/database';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(user: UserProperties): Promise<User> {
    try {
      const hashedPassword = await this.createHash(user.password);

      const createdUser = await this.usersService.create({
        ...user,
        password: hashedPassword,
      });

      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation)
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
    }
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async login(userId: number, email: string) {
    const [accessTokenCookie, refreshTokenCookie] = await Promise.all([
      this.createAccessTokenCookie(userId, email),
      this.createRefreshTokenCookie(userId, email),
    ]);

    await this.usersService.updateUserRefreshToken(userId, refreshTokenCookie.refreshToken);

    return { accessTokenCookie, refreshTokenCookie };
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (!user)
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

      const isPasswordOk = await this.validateHash(password, user.password);

      if (isPasswordOk) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, refreshToken, ...result } = user;
        return result;
      }
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async createHash(data: string): Promise<string> {
    const hashedData = await bcryptjs.hash(data, 10);

    return hashedData;
  }

  private async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hash = await this.createHash(refreshToken);

    await this.usersService.updateUserRefreshToken(userId, hash);
  }

  // Maybe move to some utils service
  private async validateHash(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }

  private async createAccessTokenCookie(
    userId: number,
    email: string,
  ): Promise<string> {
    const jwtPayload = { email, sub: userId };

    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRATION'),
    });

    const cookie = `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${this.configService.get<string>(
      'ACCESS_TOKEN_EXPIRATION',
    )}`;

    return cookie;
  }

  private async createRefreshTokenCookie(userId: number, email: string) {
    const jwtPayload = { email, sub: userId };

    const refreshToken = await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRATION'),
    });

    const cookie = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${this.configService.get<string>(
      'REFRESH_TOKEN_EXPIRATION',
    )}`;

    return {
      cookie,
      refreshToken,
    };
  }

  logout() {
    // await this.usersService.removeUserRefreshToken(userId);
    const clearedCookie = 'Authentication=; HttpOnly; Path=/; Max-Age=0';

    return clearedCookie;
  }
  // async getAccessTokenFromRefreshToken(
  //   userId: number,
  //   refreshToken: string,
  // ): Promise<Tokens> {
  //   const user = await this.usersService.findOneById(userId);

  //   if (!user || !user.refreshToken)
  //     throw new ForbiddenException('Access Denied');

  //   const isRefreshTokenOK = await bcryptjs.compare(
  //     refreshToken,
  //     user.refreshToken,
  //   );

  //   if (!isRefreshTokenOK) throw new ForbiddenException('Access Denied');

  //   const tokens = await this.createTokensPair(userId, user.email);
  //   await this.updateRefreshToken(userId, tokens.refresh_token);

  //   return tokens;
  // }
}
