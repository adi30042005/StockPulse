// import React, { useEffect, useState } from 'react'
// import axios from "axios"

// function Sales(){
//     const [opt, setOpt] = useState()
//     const [sid, setSid] = useState(0)
//     const [pid, setPid] = useState(0)
//     const [quan, setQuan] = useState(0)
//     const [data, setData] = useState('')
//     const [success, setSuccess] = useState('')
//     const [err, setErr] = useState('')

//     const handleSubmit = ()=>{
//         const newSale = {
//             StoreId:sid,
//             productId:pid,
//             Quantity:quan,
//         }
//         axios.post('http://localhost:1234/Sales/newSales', newSale)
//         .then((res)=>setSuccess(res.data.msg))
//         .catch((err)=>setErr(err))
//     }
//     useEffect(()=>{
//       axios.get(`http://localhost:1234/Sales/${sid}`).then((res)=>{
//         if (res.status === 201) setData(res.data['data'])
//         else setErr(res.data['msg'])
//       })
//     }, [])

//   return (
//     <div>
//       <button onClick={()=>setOpt("Add Sales")}>+</button>
//       {opt && 
//         <div>
//             Store ID: <input onChange={(e)=>setSid(e.target.value)} type='number'/>
//             Product ID: <input type='number' onChange={(e)=>setPid(e.target.value)}/>
//             Quantity: <input type='number'onChange={(e)=>setQuan(e.target.value)}/>
//             <button onClick={handleSubmit}>Submit</button>
//             {success && <p>{success}</p>}
//             {err && <p>{err}</p>}
//         </div>
//       }
//       {data && <p>{data}</p>}

//     </div>
//   )
// }

// export default Sales
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from 'js-cookie'
function Sales() {
  const [opt, setOpt] = useState(false);
  const [sid, setSid] = useState(0);
  const [pid, setPid] = useState(0);
  const [quan, setQuan] = useState(0);
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");

  // Fetch sales data
  useEffect(() => {
      axios
        .get(`http://localhost:1234/Sales/`)
        .then((res) => {
          if (res.status === 201) setData(res.data['data']);
          else setErr(res.data["msg"]);
        })
        .catch((error) => setErr("Error fetching sales data"));
    
  }, []); 
  console.log(data)
  const handleSubmit = () => {
    const newSale = {
      StoreId: sid,
      productId: pid,
      Quantity: quan,
    };

    axios
      .post("http://localhost:1234/Sales/newSales", newSale)
      .then((res) => {
        setSuccess(res.data.msg);
        setOpt(false); // Hide form after submission
      })
      .catch((error) => setErr("Failed to add sale"));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales Management</h1>

      {/* Add Sales Button */}
      <button
        onClick={() => setOpt(!opt)}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        {opt ? "Close Form" : "Add Sale"}
      </button>

      {/* Sales Form */}
      {opt && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <label className="block">Store ID:</label>
          <input
            onChange={(e) => setSid(parseInt(e.target.value) || 0)}
            type="number"
            className="w-full p-2 border rounded-md mb-2"
          />

          <label className="block">Product ID:</label>
          <input
            onChange={(e) => setPid(parseInt(e.target.value) || 0)}
            type="number"
            className="w-full p-2 border rounded-md mb-2"
          />

          <label className="block">Quantity:</label>
          <input
            onChange={(e) => setQuan(parseInt(e.target.value) || 0)}
            type="number"
            className="w-full p-2 border rounded-md mb-2"
          />

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Submit
          </button>

          {success && <p className="text-green-600 mt-2">{success}</p>}
          {err && <p className="text-red-600 mt-2">{err}</p>}
        </div>
      )}

      {/* Sales Data Table */}
      {data.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Sales Records</h2>
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 p-2">Date</th>
                <th className="border border-gray-400 p-2">Store ID</th>
                <th className="border border-gray-400 p-2">Product ID</th>
                <th className="border border-gray-400 p-2">Quantity</th>
                <th className="border border-gray-400 p-2">Total Cost</th>
                <th className="border border-gray-400 p-2">Collected</th>
                <th className="border border-gray-400 p-2">Discount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((sale, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-400 p-2">{sale.date}</td>
                  <td className="border border-gray-400 p-2">{sale.storeId}</td>
                  <td className="border border-gray-400 p-2">{sale.productID}</td>
                  <td className="border border-gray-400 p-2">{sale.Quantity}</td>
                  <td className="border border-gray-400 p-2">{sale.totalCost}</td>
                  <td className="border border-gray-400 p-2">
                    {sale.Collected ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-400 p-2">{sale.Discount}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No sales data available.</p>
      )}
    </div>
  );
}

export default Sales;
