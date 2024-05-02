import { Ito } from "@/features/ito";
import { Home, NotFound } from "@/features/misc";

export const ProductRoutes = [
  {
    path: "/",
    children: [
      { path: "/", element: <Home /> },
      { path: "/room/:roomId", element: <Ito /> },
      { path: "*", element: <NotFound /> }
    ]
  }
];
