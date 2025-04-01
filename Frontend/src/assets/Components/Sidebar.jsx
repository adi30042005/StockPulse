// import React from 'react'
// // import { useNavigate } from 'react-router-dom'

// function Headbar(){
//     // const nav = useNavigate()
//   return (
//     <div>
//       <button >DASHBOARD</button><br />
//       <button >INVENTORY</button><br />
//       <button >SALES</button><br />
//       <button >PURCHASE</button><br />
//       <button >VENDOR</button><br />
//       <button >STORE</button><br />
//       <button >USERS</button><br />
//     </div>
//   )
// }

// export default Headbar
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Inventory</h2>
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="p-3 bg-blue-700 rounded-md hover:bg-blue-600">
          Dashboard
        </Link>
        <Link to="/Inventory" className="p-3 bg-blue-700 rounded-md hover:bg-blue-600">
          Inventory
        </Link>
        <Link to="/Sales" className="p-3 bg-blue-700 rounded-md hover:bg-blue-600">
          Sales
        </Link>
        <Link to="/Purchase" className="p-3 bg-blue-700 rounded-md hover:bg-blue-600">
          Purchase
        </Link>
        <Link to="/Vendor" className="p-3 bg-blue-700 rounded-md hover:bg-blue-600">
          Vendor
        </Link>
        <Link to="/Store" className="p-3 bg-blue-700 rounded-md hover:bg-blue-600">
          Store
        </Link>
        <Link to="/User" className="p-3 bg-blue-700 rounded-md hover:bg-blue-600">
          Users
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
