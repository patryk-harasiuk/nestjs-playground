import { Request } from 'express';
import { User } from 'src/api/users/entities/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}
