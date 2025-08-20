import { Layout } from "@/components/layouts/Layout";
import HomePage from "@/pages/HomePage";

import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
