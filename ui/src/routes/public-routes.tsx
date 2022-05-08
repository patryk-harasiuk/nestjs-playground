import { Register } from '../features/auth/routes/register';
import { AuthRoutes } from '../features/auth/routes';

export const publicRoutes = [
  {
    path: '/auth',
    element: <Register />,
  },
];
