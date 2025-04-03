import React, { useEffect, useState } from "react";
import axios from "axios";

function Store() {
  document.title = 'StockPulse - Store'
  const [opt, setOpt] = useState(false);
  const [name, setName] = useState("");
  const [Add, setAdd] = useState("");
  const [owner, setOwner] = useState(0);
  const [user, setUser] = useState(0);
  const [res, setRes] = useState("");
  const [data, setData] = useState([]);

  // Fetch store data
  useEffect(() => {
    axios
      .get("http://localhost:1234/Store")
      .then((res) => {
        if (res.status === 200) setData(res.data.data);
        else setData([]);
      })
      .catch(() => setData([]));
  }, []);

  // Handle new store registration
  const handleReg = () => {
    const store = {
      StoreName: name,
      StoreAddress: Add,
      OwnerId: owner,
      UserId: user,
    };

    axios
      .post("http://localhost:1234/Store/AddStore", store)
      .then((res) => {
        if (res.status === 200) {
          setRes(res.data.msg);
          setOpt(false); // Hide form after submission
        } else {
          setRes(res.data.msg);
        }
      })
      .catch(() => setRes("Failed to register store"));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Store Management</h1>

      {/* Add Store Button */}
      <button
        onClick={() => setOpt(!opt)}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        {opt ? "Close Form" : "Add Store"}
      </button>

      {/* Store Form */}
      {opt && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <label className="block">Store Name:</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md mb-2"
          />

          <label className="block">Store Address:</label>
          <textarea
            onChange={(e) => setAdd(e.target.value)}
            placeholder="Enter the address"
            className="w-full p-2 border rounded-md mb-2"
          ></textarea>

          <label className="block">Owner ID:</label>
          <input
            type="number"
            onChange={(e) => setOwner(parseInt(e.target.value) || 0)}
            className="w-full p-2 border rounded-md mb-2"
          />

          <label className="block">User ID:</label>
          <input
            type="number"
            onChange={(e) => setUser(parseInt(e.target.value) || 0)}
            className="w-full p-2 border rounded-md mb-2"
          />

          <button
            onClick={handleReg}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Submit
          </button>

          {res && <p className="text-green-600 mt-2">{res}</p>}
        </div>
      )}

      {/* Store Data Table */}
      {data.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Stores</h2>
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 p-2">Store Name</th>
                <th className="border border-gray-400 p-2">Address</th>
                <th className="border border-gray-400 p-2">Total Sales</th>
                <th className="border border-gray-400 p-2">Total Expense</th>
                <th className="border border-gray-400 p-2">To Give</th>
                <th className="border border-gray-400 p-2">To Get</th>
                <th className="border border-gray-400 p-2">Owner ID</th>
                <th className="border border-gray-400 p-2">User IDs</th>
              </tr>
            </thead>
            <tbody>
              {data.map((store, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-400 p-2">{store.storeName}</td>
                  <td className="border border-gray-400 p-2">{store.storeAddress}</td>
                  <td className="border border-gray-400 p-2">{store.totalSales}</td>
                  <td className="border border-gray-400 p-2">{store.totalExp}</td>
                  <td className="border border-gray-400 p-2">{store.toGive}</td>
                  <td className="border border-gray-400 p-2">{store.toGet}</td>
                  <td className="border border-gray-400 p-2">{store.ownerId}</td>
                  <td className="border border-gray-400 p-2">{store.UserId.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No store data available.</p>
      )}
    </div>
  );
}

export default Store;
