import { useRoutes } from 'react-router-dom';

// import { mode } from "@/config";

import { ProductRoutes } from './productRoutes';
// import { DevRoutes } from './dev';


export const AppRoutes = () => {
  // const routes = mode === "dev" ? [...ProductRoutes, ...DevRoutes ] : [...PublicRoutes];
  const routes = [...ProductRoutes];

  const element = useRoutes(routes);

  return <>{element}</>;
}
