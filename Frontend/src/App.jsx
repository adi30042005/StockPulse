// import React from 'react'
// import {RouterProvider, createBrowserRouter} from "react-router-dom"
// import Login from './Pages/Login'
// import Register from './Pages/Register'
// import Success from './Pages/Success'
// import Inventory from './Pages/Inventory'
// import Store from './Pages/Store'
// import Sales from "./Pages/Sales"
// import Purchase from './Pages/Purchase'
// import Users from './Pages/Users'
// import Dashboard from './Pages/Dashboard'
// import Vendor from './Pages/Vendor'

// const route = createBrowserRouter([
//     {
//         path:'/Login',
//         element:<Login />
//     },
//     {
//         path:'/register',
//         element:<Register />
//     },
//     {
//       path:'/success',
//       element:<Success />
//     },
//     {
//       path:'/Inventory',
//       element:<Inventory />
//     },
//     {
//       path:'/Store',
//       element:<Store />
//     },
//     {
//       path:'/Sales',
//       element:<Sales />
//     },
//     {
//       path:'/Purchase',
//       element:<Purchase />
//     },
//     {
//       path:'/User',
//       element:<Users />
//     },
//     {
//       path:'/',
//       element:<Dashboard />
//     },
//     {
//       path:'/Vendor',
//       element:<Vendor />
//     },
// ])

// function  App(){
//   return (
//     <RouterProvider router={route}/>
//   )
// }

// export default App
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Headbar from "./assets/Components/Headbar";
// import Sidebar from "./assets/Components/Sidebar"; // Uncomment when adding Sidebar

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Success from "./Pages/Success";
import Inventory from "./Pages/Inventory";
import Store from "./Pages/Store";
import Sales from "./Pages/Sales";
import Purchase from "./Pages/Purchase";
import Users from "./Pages/Users";
import Dashboard from "./Pages/Dashboard";
import Vendor from "./Pages/Vendor";

import Sidebar from "./assets/Components/Sidebar"; // Import Sidebar

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex flex-col flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};
// Define Routes
const route = createBrowserRouter([
  { path: "/Login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/success", element: <Success /> },
  { path: "/Inventory", element: <Layout><Inventory /></Layout> },
  { path: "/Store", element: <Layout><Store /></Layout> },
  { path: "/Sales", element: <Layout><Sales /></Layout> },
  { path: "/Purchase", element: <Layout><Purchase /></Layout> },
  { path: "/User", element: <Layout><Users /></Layout> },
  { path: "/", element: <Layout><Dashboard /></Layout> },
  { path: "/Vendor", element: <Layout><Vendor /></Layout> },
]);

function App() {
  return <RouterProvider router={route} />;
}

export default App;
