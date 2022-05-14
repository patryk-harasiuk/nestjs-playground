import { useRoutes } from 'react-router-dom';

import { publicRoutes } from './public-routes';

export const AppRoutes = () => {
  const standardRoute = [{ path: '/', element: <div>home page</div> }];

  const routes = publicRoutes;

  const element = useRoutes([...standardRoute, ...routes]);

  return element;
};
