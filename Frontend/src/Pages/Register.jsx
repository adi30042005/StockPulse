import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Navigate } from 'react-router-dom'
function Register(){
    document.title = "StockPulse - Register"

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [passwd, setPass] = useState('')
    const [cpass, setCpass] = useState('')
    const [role, setRole] = useState('')
    const nav = Navigate()

    const handleName = (e) =>{
      setName(e.target.value)
    }
    const handleEmail = (e) =>{
      setEmail(e.target.value)
    }
    const handlePass = (e) =>{
      setPass(e.target.value)
    }
    const handleCpass = (e) =>{
      setCpass(e.target.value)
    }
    const handleRole = (e) =>{
      setRole(e.target.value)
    }
    if (passwd != cpass){
        document.getElementById('Error').textContent = "Password doesnt match"
    }
    else{
      const newUser = {
        "Name":name,
        "userName":email,
        "passwd":passwd,
        "Role":role
      }
      axios.post('http://localhost:1234/User/Register', newUser).then((res)=>{
        if (res.status(200)) nav('')
        else document.getElementById('formErr').innerText="Error in registering" 
      })
    }

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input type="text" onChange={handleName} name="name"/> <br />
      <label htmlFor="email">Email: </label>
      <input type="text" name="email" onChange={handleEmail}/> <br />
      <label htmlFor="passwd">Password: </label>
      <input type="text" name="name" onChange={handlePass}/> <br />
      <label htmlFor="cpass">Re-enter the Password: </label>
      <p id='Error'></p>
      <input type="text" name="cpass" onChange={handleCpass}/> <br />
      <label htmlFor="role">Role: </label>
      <select name="role" id="" onClick={handleRole}>
        <option value="Owner">Owner</option>
        <option value="Admin">Admin</option>
        <option value="Worker">Worker</option>
      </select>
      <p id="formErr"></p>
    </div>
  )
}

export default Register
