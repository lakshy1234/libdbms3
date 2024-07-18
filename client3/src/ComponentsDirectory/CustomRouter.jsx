import React from 'react';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import Add from '../pages/Add.jsx';
import Update from '../pages/Update.jsx';
import Books from '../pages/Books.jsx'; 
import EmployeeLogin from '../pages/Employees.jsx';
import WelcomePage from '../pages/Welcomepage.jsx';
import UserLogin from '../pages/UserLogin.jsx';
import Signin from '../pages/Signin.jsx';
import Userdata from '../pages/Userdata.jsx';
import UserView from '../pages/userviewdata.jsx';
import Adminview from '../pages/adminviewdata.jsx';

function CustomRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomePage />, // Replace with your home component
      children: [
        { path: "add", element: <Add />                   },
        { path: "update", element: <Update />             },
        { path: "books", element: <Books />               },
        { path: "employee/login",element: <EmployeeLogin/>},
        { path: "user/login",element: <UserLogin/>        },
        { path: " user/signin",element:<Signin/>          },
        { path: " user/data",element:<Userdata/>          },
        { path: " user/view",element:<UserView/>          },
        { path: " books/admview",element:<Adminview/>     }

      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default CustomRouter;
