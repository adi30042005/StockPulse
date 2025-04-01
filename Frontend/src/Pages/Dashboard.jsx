// import React from 'react'

// function Dashboard(){
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Dashboard

import React from "react";

function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
          <p className="text-2xl font-bold text-blue-600">120</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Fast Running Out</h2>
          <p className="text-2xl font-bold text-red-600">5 Items</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Sales Today</h2>
          <p className="text-2xl font-bold text-green-600">₹15,200</p>
        </div>
      </div>

      {/* Placeholder for Charts or More Data */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-500">Charts and reports will be added here.</p>
      </div>
    </div>
  );
}

export default Dashboard;
