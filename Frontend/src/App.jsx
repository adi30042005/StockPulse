import React from 'react'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Login from './Pages/Login'
import Register from './Pages/Register'
import Success from './Pages/Success'
import Inventory from './Pages/Inventory'
import Store from './Pages/Store'

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
      path:'/inventory',
      element:<Inventory />
    },
    {
      path:'/Store',
      element:<Store />
    }
])

function  App(){
  return (
    <RouterProvider router={route}/>
  )
}

export default App