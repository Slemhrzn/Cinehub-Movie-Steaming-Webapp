import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About";
import Homepage from "./pages/home/Homepage";
import Register from "./pages/register/Register";
import AdminManageMovie from "./admin/AdminManageMovie";
import Admin from "./admin/Admin";
import Addmovie from "./admin/Addmovie";
import Movie from "./pages/viewmovie/Movie";
import Adminnavbar from "./components/Adminnavbar";
import NavBar from "./components/NavBar";
import Checkbox from "./Checkbox";
import Bookmark from "./bookmark/Bookmark";
import EditMovie from "./admin/EditMovie";
// import AllMovies from './pages/home/AllMovies'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },

    {
      path: "/about",
      element: <About />,
    },

    {
      path: "/homepage",
      element: <Homepage />,
    },

    {
      path: "/register",
      element: <Register />,
    },

    {
      path: "/admin/addmovies",
      element: <Addmovie />,
    },
    {
      path: "/viewmovie/:id",
      element: <Movie />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/admin/managemovie",
      element: <AdminManageMovie />,
    },
    {
      path: "/checkbox",
      element: <Checkbox />,
    },
    {
      path: "/bookmark",
      element: <Bookmark />,
    },
    {
      path: "/editMovie/:id",
      element: <EditMovie />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
