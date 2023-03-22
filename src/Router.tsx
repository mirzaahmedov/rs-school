import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";

import Home from "./pages/Home"
import Forms from "./pages/Forms"
import Layout from "./layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/forms",
        element: <Forms />,
      },
      {
        path: "/404",
        element: <div>404</div>,
      },
      {
        path: "*",
        loader: () => redirect("/404"),
      }
    ],
  },
]);

const Router = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Router
