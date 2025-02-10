import Error404 from "../pages/error/404";

const routes = [
  // {
  //   path: "/",
  //   element: <Layout />,  // Wrap everything inside Layout
  //   children: [
  //     {
  //       path: "",
  //       element: <Homepage />,
  //     },
  //     {
  //       path: "shop",
  //       element: <Shop />,
  //     },
  //   ],
  // },
  {
    path: "*",
    element: <Error404 />
  }
];

export default routes;