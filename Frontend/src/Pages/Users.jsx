import React, { useEffect, useState } from 'react'
import Cookie from "js-cookie"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
function Users(){
    const [data, setData] = useState()
    const [Opasswd, setOPasswd] = useState('')
    const [Npass, setNPasswd] = useState('')
    const [CNpass, setCNPasswd] = useState('')
    const [opt, setOpt] = useState('')
    const [success, setSuc] = useState('')
    const nav = useNavigate();
    const username = Cookie.get("username");
    if (!username) return nav('/Login');
    useEffect(()=>{
        axios.get(`http://localhost:1234/User/username/${username}`)
        .then((res)=>{
            if (res.status === 201) setData(res.data);
        })
    },[])

    const handlePass =()=>{
        if (Npass === CNpass && data['passwd'] === Opasswd){
            axios.get(`http://localhost:1234/User/changePasswd/${Npass}`)
            .then((res)=>{
                if (res.status === 204) setSuc('Password Changed Successfully');
            })
        }
    }

  return (
    <div>
      {data && <p>{data}</p>}
      <button onClick={()=>setOpt('Change Password')}>Change Password</button>
      {opt && <form action="">
        Enter Old Password: <input type='password' onChange={(e)=>setOPasswd(e.target.value)}/>
        Enter New Password: <input type='password' onChange={(e)=>setNPasswd(e.target.value)}/>
        Re-Enter New Password: <input type='password' onChange={(e)=>setCNPasswd(e.target.value)}/>
        <button onClick={handlePass}>Change Password</button>
      </form>}
      {success && <p>{success}</p>}
    </div>
  )
}

export default Users
