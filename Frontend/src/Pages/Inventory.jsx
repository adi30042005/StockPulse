  // import React, { useEffect, useState } from "react";
// import SearchEngine from "../assets/Components/SearchEngine";
// import axios from "axios";
// import Cookie from "js-cookie";

// function Inventory() {
//   const [Search, setSearch] = useState("");
//   const [res, setRes] = useState(null);
//   const [option, setOption] = useState("");
//   const [name, setName] = useState("");
//   const [mrp, setMrp] = useState(0);
//   const [quan, setQuan] = useState(0);
//   const [RP, setRP] = useState(0);
//   const [Cate, setCate] = useState("");
//   const [StoreId, setStore] = useState(0);
//   const [bought, setB] = useState(0);
//   const [sold, setS] = useState(0);
//   const [season, setSeason] = useState("");
//   const [promo, setPromo] = useState("");
//   const [data, setData] = useState(null);
//   const [msg, setMsg] = useState("");

//   useEffect(() => {
//     axios
//       .get(`http://localhost:1234/Inventory/${Cookie.get("StoreID")}`)
//       .then((res) => {
//         setData(res.data || "No products are present");
//       })
//       .catch((err) => {
//         setMsg(err.message);
//       });
//   }, []);

//   const handleSearch = () => {
//     axios
//       .get(`http://localhost:1234/Inventory/NameSearch/${Search}`)
//       .then((res) => setRes(res.data))
//       .catch((err) => setMsg(err.message));
//   };

//   const handleSubmit = () => {
//     const newPdt = {
//       Name: name,
//       MRP: mrp,
//       Quantity: quan,
//       sID: StoreId,
//       RP: RP,
//       Category: Cate,
//       uB: bought,
//       uS: sold,
//       season: season,
//       p: promo,
//     };

//     axios
//       .post("http://localhost:1234/Inventory/NewAdmin", newPdt)
//       .then(() => setMsg("New Product Successfully added"))
//       .catch((err) => setMsg("Error: " + err.message));
//   };

//   return (
//     <div>
//       <h1>Inventory Management</h1>
//       <SearchEngine SetSearch={setSearch} />
//       <button onClick={handleSearch}>Search</button>
//       <br />
//       {res && <p>{JSON.stringify(res)}</p>}
//       <button onClick={() => setOption("clicked")}>+</button>
//       {option && (
//         <div>
//           <label>Product Name:</label>
//           <input type="text" onChange={(e) => setName(e.target.value)} /> <br />
//           <label>MRP:</label>
//           <input type="number" onChange={(e) => setMrp(parseFloat(e.target.value) || 0)} /> <br />
//           <label>Quantity:</label>
//           <input type="number" onChange={(e) => setQuan(parseInt(e.target.value) || 0)} /> <br />
//           <label>Retail Price:</label>
//           <input type="number" onChange={(e) => setRP(parseFloat(e.target.value) || 0)} /> <br />
//           <label>Category:</label>
//           <input type="text" onChange={(e) => setCate(e.target.value)} /> <br />
//           <label>Store ID:</label>
//           <input type="number" onChange={(e) => setStore(parseInt(e.target.value) || 0)} /> <br />
//           <label>Units Bought:</label>
//           <input type="number" onChange={(e) => setB(parseInt(e.target.value) || 0)} /> <br />
//           <label>Units Sold:</label>
//           <input type="number" onChange={(e) => setS(parseInt(e.target.value) || 0)} /> <br />
//           <label>Seasonality:</label>
//           <input type="text" onChange={(e) => setSeason(e.target.value)} /> <br />
//           <label>Promotion:</label>
//           <input type="text" onChange={(e) => setPromo(e.target.value)} /> <br />
//           <button onClick={handleSubmit}>Submit</button>
//         </div>
//       )}
//       <br />
//       {data && <p>{JSON.stringify(data)}</p>}
//       <p>{msg}</p>
//     </div>
//   );
// }

// export default Inventory;
import React, { useEffect, useState } from "react";
import SearchEngine from "../assets/Components/SearchEngine";
import axios from "axios";
import Cookie from "js-cookie";

function Inventory() {
  const [search, setSearch] = useState("");
  const [res, setRes] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState("");

  // Form Fields
  const [name, setName] = useState("");
  const [mrp, setMrp] = useState(0);
  const [quan, setQuan] = useState(0);
  const [rp, setRP] = useState(0);
  const [cate, setCate] = useState("");
  const [storeId, setStore] = useState(0);
  const [bought, setB] = useState(0);
  const [sold, setS] = useState(0);
  const [season, setSeason] = useState("");
  const [promo, setPromo] = useState("");

  // Fetch Inventory Data
  useEffect(() => {
    axios
      .get(`http://localhost:1234/Inventory/${Cookie.get("StoreID")}`)
      .then((res) => {
        setData(res.data || []);
      })
      .catch((err) => {
        setMsg(err.message);
      });
  }, []);
  console.log(data)
  // Search Function
  const handleSearch = () => {
    axios
      .get(`http://localhost:1234/Inventory/NameSearch/${search}`)
      .then((res) => setRes(res.data))
      .catch((err) => setMsg(err.message));
  };

  // Add New Product
  const handleSubmit = () => {
    const newProduct = {
      Name: name,
      MRP: mrp,
      Quantity: quan,
      sID: storeId,
      RP: rp,
      Category: cate,
      uB: bought,
      uS: sold,
      season: season,
      p: promo,
    };

    axios
      .post("http://localhost:1234/Inventory/NewAdmin", newProduct)
      .then(() => {
        setMsg("New Product Successfully Added");
        setShowForm(false);
      })
      .catch((err) => setMsg("Error: " + err.message));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>

      {/* Search */}
      <div className="mb-4 flex items-center gap-2">
        <SearchEngine setSearch={setSearch} />
        <button onClick={handleSearch} className="p-2 bg-blue-600 text-white rounded-md">
          Search
        </button>
      </div>

      {/* Search Results */}
      {res && (
        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold">Search Results:</h2>
          <pre className="text-sm text-gray-700">{JSON.stringify(res, null, 2)}</pre>
        </div>
      )}

      {/* Add New Product Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-4 mb-4 px-4 py-2 bg-green-600 text-white rounded-md"
      >
        {showForm ? "Cancel" : "Add New Item"}
      </button>

      {/* Add New Product Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Product Name" onChange={(e) => setName(e.target.value)} className="p-2 border rounded-md" />
            <input type="number" placeholder="MRP" onChange={(e) => setMrp(parseFloat(e.target.value) || 0)} className="p-2 border rounded-md" />
            <input type="number" placeholder="Quantity" onChange={(e) => setQuan(parseInt(e.target.value) || 0)} className="p-2 border rounded-md" />
            <input type="number" placeholder="Retail Price" onChange={(e) => setRP(parseFloat(e.target.value) || 0)} className="p-2 border rounded-md" />
            <input type="text" placeholder="Category" onChange={(e) => setCate(e.target.value)} className="p-2 border rounded-md" />
            <input type="number" placeholder="Store ID" onChange={(e) => setStore(parseInt(e.target.value) || 0)} className="p-2 border rounded-md" />
            <input type="number" placeholder="Units Bought" onChange={(e) => setB(parseInt(e.target.value) || 0)} className="p-2 border rounded-md" />
            <input type="number" placeholder="Units Sold" onChange={(e) => setS(parseInt(e.target.value) || 0)} className="p-2 border rounded-md" />
            <input type="text" placeholder="Seasonality" onChange={(e) => setSeason(e.target.value)} className="p-2 border rounded-md" />
            <input type="text" placeholder="Promotion" onChange={(e) => setPromo(e.target.value)} className="p-2 border rounded-md" />
          </div>

          <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
            Submit
          </button>
        </div>
      )}

      {/* Display Inventory Data in a Table */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Inventory List</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">MRP</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Store ID</th>
              <th className="border p-2">Retail Price</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Units Bought</th>
              <th className="border p-2">Units Sold</th>
              <th className="border p-2">Seasonality</th>
              <th className="border p-2">Promotion</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="border p-2">{item._id}</td>
                  <td className="border p-2">{item.productName}</td>
                  <td className="border p-2">{item.MRP}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">{item.storeID}</td>
                  <td className="border p-2">{item.retailPrice}</td>
                  <td className="border p-2">{item.category}</td>
                  <td className="border p-2">{item.unitsBought}</td>
                  <td className="border p-2">{item.unitsSold}</td>
                  <td className="border p-2">{item.seasonality}</td>
                  <td className="border p-2">{item.promotion}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="border p-2 text-center">
                  No Products Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-red-500">{msg}</p>
    </div>
  );
}

export default Inventory;
