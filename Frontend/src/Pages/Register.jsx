import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'



function Register(){
    document.title = "StockPulse - Register"
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [cpass, setCpass] = useState('')
    const [role, setRole] = useState('')
    const [err, setError] = useState('')

    const nav = useNavigate()

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
    
      const handleSubmit = async() =>{
        if (!(name || email || passwd || role)){
          setError("Missing Fields")
          return
        }
        if (passwd === cpass) {
          setError("Password Mismatch Error")
          return
        }
        else setError("")
        
        const newUser = {
          "Name":name,
          "userName":email,
          "passwd":password,
          "Role":role
        }
        try {
          const res = await axios.post("http://localhost:1234/User/Register", newUser)
          if (res.status === 200) {
            nav('/success')
            console.log(res.id)
            document.cookie = ``
          }
        } catch (error) {
          console.error(error)
          setError("Registration failed please try again")
        }
      }

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input type="text" onChange={handleName} name="name"/> <br />
      <label htmlFor="email">Email: </label>
      <input type="email" name="email" onChange={handleEmail}/> <br />
      <label htmlFor="passwd">Password: </label>
      <input type="password" name="password" onChange={handlePass}/> <br />
      <label htmlFor="cpass">Re-enter the Password: </label>
      <input type="password" name="cpass" onChange={handleCpass}/> <br />
      {err && <p>{err}</p>}
      <label htmlFor="role">Role: </label>
      <select name="role" id="" onChange={handleRole}>
        <option value="Owner">Owner</option>
        <option value="Admin">Admin</option>
        <option value="Worker">Worker</option>
      </select>
      <p id="formErr"></p>
      <button onClick={handleSubmit}>Register</button>
    </div>
  )
}

export default Register
