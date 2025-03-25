import React, { useState } from 'react'
import axios from "axios"

function Sales(){
    const [opt, setOpt] = useState()
    const [sid, setSid] = useState(0)
    const [pid, setPid] = useState(0)
    const [quan, setQuan] = useState(0)
    const [data, setData] = useState('')

    const handleSubmit = ()=>{
        const newSale = {
            StoreId:sid,
            productId:pid,
            Quantity:quan,
        }
        axios.post('http://localhost:1234/Sales/newSales', newSale)
        .then((res)=>setData(res.data.msg))
        .catch((err)=>setData(err))
    }

  return (
    <div>
      <button onClick={()=>setOpt("Add Sales")}>+</button>
      {opt && 
        <div>
            Store ID: <input onChange={(e)=>setSid(e.target.value)} type='number'/>
            Product ID: <input type='number' onChange={(e)=>setPid(e.target.value)}/>
            Quantity: <input type='number'onChange={(e)=>setQuan(e.target.value)}/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
      }
      {data && <p>{data}</p>}

    </div>
  )
}

export default Sales
