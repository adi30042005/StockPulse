import React, { useEffect, useState } from 'react'
import axios from "axios"
function Store(){
    const [opt, setOpt] = useState('')
    const [name, setName] = useState('')
    const [Add, setAdd] = useState('')
    const [owner, setOwner] = useState(0)
    const [user,setUser] = useState(0)
    const [res,setRes] = useState('')
    const [data, setData] = useState()
    const handleReg =() =>{
        const store = {
            StoreName:name,
            StoreAddress:Add,
            OwnerId:owner,
            UserId: user
        }
        axios.post('http://localhost:1234/Store/AddStore', store)
        .then((res)=>{
            if (res.status === 200)setRes(res.data.msg)
            else if(res.status === 401) setRes(res.data.msg)
        })
        .catch((err)=> setRes(err))
    }
    useEffect(()=>{
        axios.get('http://localhost:1234/Store')
        .then((res)=>{
            if (res.status === 200) setData(res.data.data)
            else setData(res.data.msg)
        })
        .catch((err)=>setData(err))
    },[])
  return (
    <div>
      <button onClick={() => setOpt("register")}>+</button>
      {(opt === 'register') && 
        <div>
            Store Name:<input type='text' onChange={(e)=>setName(e.target.value)}/>
            Store Address: <textarea onChange={(e)=>setAdd(e.target.value)} placeholder='Enter the address'></textarea>
            OwnerID: <input type='number' onChange={(e)=>setOwner(e.target.value)}/>
            UserId: <input type='number' onChange={(e)=>setUser(e.target.value)}/>
            <button onClick={handleReg}>Submit</button>
        </div>
      }
        <br />

        {res && <p>{res}</p>}
        {data && <p>{data}</p>}
    </div>
  )
}

export default Store