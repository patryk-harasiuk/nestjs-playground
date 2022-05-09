import { Register } from '../features/auth/routes/register';
import { Routes, useRoutes } from 'react-router-dom';

import { Route } from 'react-router-dom';
import { publicRoutes } from './public-routes';

export const AppRoutes = () => {
  const standardRoute = [{ path: '/', element: <div>home page</div> }];

  const routes = publicRoutes;

  const element = useRoutes([...standardRoute, ...publicRoutes]);

  return element;
};
