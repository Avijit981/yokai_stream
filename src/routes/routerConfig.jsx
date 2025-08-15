import Hero from "../pages/Hero";
import Home from "../pages/Home";

const routes = [
  {
    path: "/",
    element: <Hero />,
  },
  {
    path: "/home",
    element: <Home />,
  },
//   {
//     path: "/about",
//     element: <About />,
//   },
//   {
//     path: "*",
//     element: <NotFound />,
//   },
];

export default routes;