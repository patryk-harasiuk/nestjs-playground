import axios from 'axios';

import { UserResponse } from '../types';

export type RegisterCredentials = {
  email: string;
  name: string;
  password: string;
};

export const registerWithEmailAndPassword = (data: RegisterCredentials): Promise<UserResponse> =>
  axios.post('/register', data);
