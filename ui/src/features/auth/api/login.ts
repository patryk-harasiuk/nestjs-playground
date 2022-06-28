import axios from 'axios';

import { UserResponse } from '../types';

export type LoginCredentials = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentials): Promise<UserResponse> =>
  axios.post('/login', data);
