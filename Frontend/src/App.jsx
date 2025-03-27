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

const route = createBrowserRouter([
    {
        path:'/',
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
])

function  App(){
  return (
    <RouterProvider router={route}/>
  )
}

export default App