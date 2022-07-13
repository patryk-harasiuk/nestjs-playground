import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/api/users/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    const isPasswordOk = await this.validateHash(password, user.password);

    if (isPasswordOk) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Maybe move to some utils service
  private async validateHash(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
