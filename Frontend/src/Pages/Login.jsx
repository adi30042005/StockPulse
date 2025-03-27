import React, { useState } from 'react'
import axios from "axios"
import Cookies from "js-cookie"
import {useNavigate} from "react-router-dom"

function Login(){
    document.title = "StockPulse- Login"
    const [username, setUname] = useState('')
    const [passwd, setPasswd] = useState('')
    const [err, setError] = useState('')
    const navigate = useNavigate()

    const handleUser = (e) =>{
        setUname(e.target.value)
    }
    const handlePasswd = (e) =>{
        setPasswd(e.target.value)
    }
    const handleLogin = async(e) =>{
        const detail = {uName:username, Passwd:passwd}
        try {
            const res = await axios.post('http://localhost:1234/User/Login', detail)
            console.log(res)
            if (res.status === 202) {
                Cookies.set('username', res.data.id, {expires:null})
                navigate('/success')
            }    
        } catch (error) {
            setError('Error in logging in')
        }
    }
  return (
    <div>
        <label htmlFor="name">Userame: </label>
        <input type="text" name="name" id="name" onChange={handleUser} /> <br />
        <label htmlFor="passwd">Password: </label>
        <input type="text" name="passwd" id="passwd" onChange={handlePasswd}/> <br />
        <button id='submit' onClick={handleLogin}>Login</button>
        {err && <p>{err}</p>}
    </div> 
  )
}

export default Login
