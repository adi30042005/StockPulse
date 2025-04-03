import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";
import { FaStore, FaUserCircle } from "react-icons/fa";
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

import Sidebar from "./assets/Components/Sidebar"; 
import Headbar from "./assets/Components/Headbar"; 

const Layout = ({ children }) => {
  const isLoggedIn = Cookies.get("username"); // Check if user is logged in

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        {isLoggedIn && <Headbar />} {/* Show Headbar only if logged in */}
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
