import { NotFound } from "@/features/misc";

export const ProductRoutes = [
  {
    path: "/",
    element: <NotFound />,
    children: [
      { path: "/", element: <NotFound /> },
    ]
  }
];
