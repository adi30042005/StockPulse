// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Dashboard() {
//     document.title = 'StockPulse - Dashboard';

//     // State for prediction results
//     const [prediction, setPrediction] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

    

//     const fetchPrediction = async () => {
//         setLoading(true);
//         setError(null);

//         const productData = {
//             storeID: 1,  // Replace with actual data
//             ProductID: 101,
//             Category: "Electronics",
//             Region: "South",
//             InventoryLevel: 20,
//             UnitsSold: 5,
//             UnitsOrdered: 10,
//             DemandForecast: 15,
//             Price: 500,
//             Discount: 10,
//             WeatherCondition: "Sunny",
//             HolidayPromotion: 0,
//             CompetitorPricing: 490,
//             Seasonality: "Winter"
//         };

//         try {
//             const response = await axios.post("http://localhost:5000/predict", productData);
//             setPrediction(response.data.prediction);
//         } catch (err) {
//             setError("Error fetching prediction. Try again.");
//             console.error("API Error:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

//             {/* Overview Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-white p-6 rounded-lg shadow-md">
//                     <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
//                     <p className="text-2xl font-bold text-blue-600">120</p>
//                 </div>

//                 <div className="bg-white p-6 rounded-lg shadow-md">
//                     <h2 className="text-lg font-semibold text-gray-700">Fast Running Out</h2>
//                     <p className="text-2xl font-bold text-red-600">5 Items</p>
//                 </div>

//                 <div className="bg-white p-6 rounded-lg shadow-md">
//                     <h2 className="text-lg font-semibold text-gray-700">Total Sales Today</h2>
//                     <p className="text-2xl font-bold text-green-600">₹15,200</p>
//                 </div>
//             </div>

//             {/* Prediction Button */}
//             <div className="mt-6 bg-white p-6 rounded-lg shadow-md text-center">
//                 <h2 className="text-lg font-semibold text-gray-700 mb-4">Predict Inventory Demand</h2>
//                 <button 
//                     onClick={fetchPrediction} 
//                     className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
//                     disabled={loading}
//                 >
//                     {loading ? "Predicting..." : "Get Prediction"}
//                 </button>

//                 {/* Show Prediction Result */}
//                 {prediction !== null && (
//                     <p className="mt-4 text-xl font-bold text-green-600">
//                         Predicted Demand: {prediction}
//                     </p>
//                 )}

//                 {/* Show Error Message */}
//                 {error && (
//                     <p className="mt-4 text-red-600">{error}</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Dashboard;
import React, { useState } from "react";

function Dashboard() {
    document.title = 'StockPulse - Dashboard';

    const [showTable, setShowTable] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);

    const productStockData = [
        { id: 1, name: "Phone", remainingStock: 15, runOutDays: 4 },
        { id: 2, name: "Laptop", remainingStock: 8, runOutDays: 2 },
        { id: 3, name: "Tablet", remainingStock: 20, runOutDays: 1 },
        { id: 4, name: "SmartWatch", remainingStock: 10, runOutDays: 7 },
    ];

    const handleShowTable = () => {
        setLoadingTable(true);
        setTimeout(() => {
            setShowTable(true);
            setLoadingTable(false);
        }, 5000); // 5 seconds delay
    };

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

            <br />

            {/* Button to show table */}
            <div className="mb-6 text-center">
                <button
                    onClick={handleShowTable}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    disabled={loadingTable || showTable}
                >
                    {loadingTable ? "Loading..." : "Show Stock Runout Table"}
                </button>
            </div>

            {/* Inventory Table */}
            {showTable && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Stock Runout Table</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="px-4 py-2 border">Product Name</th>
                                    <th className="px-4 py-2 border">Remaining Stock</th>
                                    <th className="px-4 py-2 border">Days Until Run Out</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productStockData.map(product => (
                                    <tr key={product.id} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border">{product.name}</td>
                                        <td className="px-4 py-2 border">{product.remainingStock}</td>
                                        <td className="px-4 py-2 border text-red-600 font-semibold">
                                            {product.runOutDays} day{product.runOutDays > 1 ? "s" : ""}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
