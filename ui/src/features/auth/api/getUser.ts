import axios from 'axios';

import { AuthUser } from '../types';

export const getUser = (): Promise<AuthUser> => axios.get('/user');
