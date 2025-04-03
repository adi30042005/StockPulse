// import React, { useEffect, useState } from 'react'

// function Purchase(){
//     const [opt, setOpt] = useState('')
//     const [date, setDate] = useState()
//     const [pid, setPid] = useState(0)
//     const [sid, setSid] = useState(0)
//     const [rp, setRp] = useState(0.0)
//     const [Quantity, setQuan] = useState(0)
//     const [paid, setPaid] = useState(false)
//     const [success, setSuccess] = useState('')
//     const [err, setErr] = useState('')
//     const [data, setData] = useState('')

//     const handleSubmit = () =>{
//         const newPurchase = {
//             productId:pid,
//             storeID:sid,
//             Date:date,
//             RetailPrice:rp,
//             Quantity:Quantity,
//             Paid:paid
//         }
//         axios.post('http://localhost:1234/Purchase', newPurchase)
//         .then((res)=>setSuccess(res.data.msg))
//         .catch((err)=>setErr(err))
//     }
//     useEffect(()=>{
//       axios.get('http://localhost:1234/Purchase').then((res)=>{
//         setData(res.b)
//       })
//     }, [])
//   return (
//     <div>
//       <button onClick={()=>setOpt('Add product')}>+</button>
//       {(opt === 'Add product') &&
//         <div>
//             Date: <input type='date' onChange={(e)=>setDate(e.target.value)}/>
//             Product Id: <input type='number' onChange={(e)=>setPid(e.target.value)}/>
//             Store Id: <input type='number'onChange={(e)=>setSid(e.target.value)}/>
//             Retail Price: <input type='number'onChange={(e)=>setRp(e.target.value)}/>
//             Quantity: <input type='number' onChange={(e)=>setQuan(e.target.value)}/>
//             Paid: < input type='boolean'onChange={(e)=>setPaid(e.target.value)}/>
//             <button onClick={handleSubmit}>Submit</button>
//             {success && <p>{success}</p>}
//             {err && <p>{err}</p>}
//         </div>
//       }
//       {data && <p>{data}</p>}
//     </div>
//   )
// }

// export default Purchase
import React, { useEffect, useState } from "react";
import axios from "axios";

function Purchase() {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [pid, setPid] = useState(0);
  const [sid, setSid] = useState(0);
  const [rp, setRp] = useState(0.0);
  const [quantity, setQuantity] = useState(0);
  const [paid, setPaid] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  // Fetch purchase data
  useEffect(() => {
    axios
      .get("http://localhost:1234/Purchase")
      .then((res) => {
        setData(res.data || []);
      })
      .catch((err) => setError(err.message));
  }, []);
  // console.log(data)
  const handleSubmit = () => {
    const newPurchase = {
      productId: pid,
      storeID: sid,
      Date: date,
      RetailPrice: rp,
      Quantity: quantity,
      Paid: paid,
    };
    
    axios
      .post("http://localhost:1234/Purchase", newPurchase)
      .then((res) => {
        setSuccess("Purchase successfully added!");
        setError("");
        setShowForm(false);
      })
      .catch((err) => {
        setError("Error adding purchase");
        setSuccess("");
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Purchase Management</h1>

      {/* Button to toggle form */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        {showForm ? "Close" : "+"} Add Purchase
      </button>

      {/* Form to add new purchase */}
      {showForm && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Date:</label>
              <input
                type="date"
                className="p-2 border rounded-md w-full"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Product ID:</label>
              <input
                type="number"
                className="p-2 border rounded-md w-full"
                onChange={(e) => setPid(parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Store ID:</label>
              <input
                type="number"
                className="p-2 border rounded-md w-full"
                onChange={(e) => setSid(parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Retail Price:</label>
              <input
                type="number"
                className="p-2 border rounded-md w-full"
                onChange={(e) => setRp(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Quantity:</label>
              <input
                type="number"
                className="p-2 border rounded-md w-full"
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Paid:</label>
              <select
                className="p-2 border rounded-md w-full"
                onChange={(e) => setPaid(e.target.value === "true")}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Submit
          </button>

          {success && <p className="text-green-600 mt-2">{success}</p>}
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      )}

      {/* Table to display fetched purchases */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Purchase Records</h2>
        {data.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Date</th>
                <th className="border p-2">Product ID</th>
                <th className="border p-2">Store ID</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Paid</th>
              </tr>
            </thead>
            <tbody>
              {data.map((purchase, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{purchase.date}</td>
                  <td className="border p-2">{purchase.productId}</td>
                  <td className="border p-2">{purchase.storeID}</td>
                  <td className="border p-2">{purchase.quantity}</td>
                  <td className="border p-2">
                    {purchase.Paid ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No purchase records found.</p>
        )}
      </div>
    </div>
  );
}

export default Purchase;
