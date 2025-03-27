import React, { useEffect, useState } from 'react'

function Purchase(){
    const [opt, setOpt] = useState('')
    const [date, setDate] = useState()
    const [pid, setPid] = useState(0)
    const [sid, setSid] = useState(0)
    const [rp, setRp] = useState(0.0)
    const [Quantity, setQuan] = useState(0)
    const [paid, setPaid] = useState(false)
    const [success, setSuccess] = useState('')
    const [err, setErr] = useState('')
    const [data, setData] = useState('')

    const handleSubmit = () =>{
        const newPurchase = {
            productId:pid,
            storeID:sid,
            Date:date,
            RetailPrice:rp,
            Quantity:Quantity,
            Paid:paid
        }
        axios.post('http://localhost:1234/Purchase', newPurchase)
        .then((res)=>setSuccess(res.data.msg))
        .catch((err)=>setErr(err))
    }
    useEffect(()=>{
      axios.get('http://localhost:1234/Purchase').then((res)=>{
        setData(res.b)
      })
    }, [])
  return (
    <div>
      <button onClick={()=>setOpt('Add product')}>+</button>
      {(opt === 'Add product') &&
        <div>
            Date: <input type='date' onChange={(e)=>setDate(e.target.value)}/>
            Product Id: <input type='number' onChange={(e)=>setPid(e.target.value)}/>
            Store Id: <input type='number'onChange={(e)=>setSid(e.target.value)}/>
            Retail Price: <input type='number'onChange={(e)=>setRp(e.target.value)}/>
            Quantity: <input type='number' onChange={(e)=>setQuan(e.target.value)}/>
            Paid: < input type='boolean'onChange={(e)=>setPaid(e.target.value)}/>
            <button onClick={handleSubmit}>Submit</button>
            {success && <p>{success}</p>}
            {err && <p>{err}</p>}
        </div>
      }
      {data && <p>{data}</p>}
    </div>
  )
}

export default Purchase
