import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login/Login'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from './pages/About'
import Homepage from './pages/home/Homepage'
import Register from './pages/register/Register'


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path:"/about",
      element:<About/>
    },
    {
      path:"/homepage",
      element:<Homepage/>
    },
    {
      path:"/register",
      element:<Register/>
    }
  ]);
  return <RouterProvider router={router} />;
};


export default App
