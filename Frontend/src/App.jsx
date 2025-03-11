import React from 'react'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Login from './Pages/Login'
import Register from './Pages/Register'
import Success from './Pages/Success'

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
    }
])

function  App(){
  return (
    <RouterProvider router={route}/>
  )
}

export default App