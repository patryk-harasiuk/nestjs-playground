import { User } from 'src/api/users/entities/user.entity';
import { UserProperties } from 'src/auth/interfaces';

export const mockedUser: User = {
  id: 1,
  password: 'password',
  email: 'test@test.pl',
  name: 'test',
  refreshToken: null,
  isActive: true,
};

export const mockedUserRegisterData: UserProperties = {
  email: 'test@test.pl',
  password: 'password',
  name: 'test',
};
