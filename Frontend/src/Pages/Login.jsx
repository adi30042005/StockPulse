import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"

function Login(){
    document.title = "StockPulse- Login"
    const [username, setUname] = useState('')
    const [passwd, setPasswd] = useState('')
    const navigate = useNavigate()

    const handleUser = (e) =>{
        setUname(e.target.value)
    }
    const handlePasswd = (e) =>{
        setPasswd(e.target.value)
    }
    const handleLogin = (e) =>{
        const detail = {"uName":username, "Passwd":passwd}
        axios.get('http://localhost:1234/User/Login', detail).then((res)=>{
            if (res.status === 202){
                navigate('')
            }
            else{
                document.getElementById('error').innerText = "Login Failed, Please try again"
            }
        })
        
    }
  return (
    <div>
        <label htmlFor="name">Userame: </label>
        <input type="text" name="name" id="name" onChange={handleUser} /> <br />
        <label htmlFor="passwd">Password: </label>
        <input type="text" name="passwd" id="passwd" onChange={handlePasswd}/> <br />
        <button id='submit' onClick={handleLogin}>Login</button>
        <p id='error'></p>
    </div> 
  )
}

export default Login
