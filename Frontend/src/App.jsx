import React from 'react'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Login from './Pages/Login'
import Register from './Pages/Register'
import Success from './Pages/Success'
import Inventory from './Pages/Inventory'
import Store from './Pages/Store'
import Sales from "./Pages/Sales"
import Purchase from './Pages/Purchase'
import Users from './Pages/Users'
import Dashboard from './Pages/Dashboard'
import Vendor from './Pages/Vendor'

const route = createBrowserRouter([
    {
        path:'/Login',
        element:<Login />
    },
    {
        path:'/register',
        element:<Register />
    },
    {
      path:'/success',
      element:<Success />
    },
    {
      path:'/Inventory',
      element:<Inventory />
    },
    {
      path:'/Store',
      element:<Store />
    },
    {
      path:'/Sales',
      element:<Sales />
    },
    {
      path:'/Purchase',
      element:<Purchase />
    },
    {
      path:'/User',
      element:<Users />
    },
    {
      path:'/',
      element:<Dashboard />
    },
    {
      path:'/Vendor',
      element:<Dashboard />
    },
])

function  App(){
  return (
    <RouterProvider router={route}/>
  )
}

export default App