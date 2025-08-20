import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import Hero from "../pages/Hero";
import Home from "../pages/Home";
import WatchList from "../pages/WatchList";
import PrivateRoute from "../components/PrivateRoute";

const routes = [
  {
    path: "/",
    element: <Hero />,
  },
  {
    path: "/home",
    element: <Home />,
  },
{
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  // {
  //   path: "/watch/:id",
  //   element: (
  //     <PrivateRoute>
  //       <WatchPage />
  //     </PrivateRoute>
  //   ),
  // },
  {
    path: "/watchlist",
    element: (
      <PrivateRoute>
        <WatchList />
      </PrivateRoute>
    ),
  },
  // {
  //   path: "/profile",
  //   element: (
  //     <PrivateRoute>
  //       <Profile />
  //     </PrivateRoute>
  //   ),
  // },
  // Fallback for 404
  {
    path: "*",
    element: <h1 className="text-center text-white mt-20">404 Not Found</h1>,
  },
];

export default routes;