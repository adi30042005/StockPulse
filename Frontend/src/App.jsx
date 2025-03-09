import React from 'react'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Login from './Pages/Login'
import Register from './Pages/Register'

const route = createBrowserRouter([
    {
        path:'/',
        element:<Login />
    },
    {
        path:'/register',
        element:<Register />
    }
])

function  App(){
  return (
    <RouterProvider router={route}/>
  )
}

export default App