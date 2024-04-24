import { Home, NotFound } from "@/features/misc";

export const ProductRoutes = [
  {
    path: "/",
    children: [
      { path: "/", element: <Home /> },
      { path: "*", element: <NotFound /> }
    ]
  }
];
