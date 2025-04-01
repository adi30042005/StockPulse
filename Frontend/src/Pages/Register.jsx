// import React, { useState, useEffect } from 'react'
// import axios from "axios"
// import { useNavigate } from 'react-router-dom'



// function Register(){
//     document.title = "StockPulse - Register"
//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPass] = useState('')
//     const [cpass, setCpass] = useState('')
//     const [role, setRole] = useState('')
//     const [err, setError] = useState('')

//     const nav = useNavigate()

//     const handleName = (e) =>{
//       setName(e.target.value)
//     }
//     const handleEmail = (e) =>{
//       setEmail(e.target.value)
//     }
//     const handlePass = (e) =>{
//       setPass(e.target.value)
//     }
//     const handleCpass = (e) =>{
//       setCpass(e.target.value)
//     }
//     const handleRole = (e) =>{
//       setRole(e.target.value)
//     }
    
//       const handleSubmit = async() =>{
//         if (!(name || email || passwd || role)){
//           setError("Missing Fields")
//           return
//         }
//         if (passwd === cpass) {
//           setError("Password Mismatch Error")
//           return
//         }
//         else setError("")
        
//         const newUser = {
//           "Name":name,
//           "userName":email,
//           "passwd":password,
//           "Role":role
//         }
//         try {
//           const res = await axios.post("http://localhost:1234/User/Register", newUser)
//           if (res.status === 200) {
//             nav('/success')
//             console.log(res.id)
//             document.cookie = ``
//           }
//         } catch (error) {
//           console.error(error)
//           setError("Registration failed please try again")
//         }
//       }

//   return (
//     <div>
//       <label htmlFor="name">Name: </label>
//       <input type="text" onChange={handleName} name="name"/> <br />
//       <label htmlFor="email">Email: </label>
//       <input type="email" name="email" onChange={handleEmail}/> <br />
//       <label htmlFor="passwd">Password: </label>
//       <input type="password" name="password" onChange={handlePass}/> <br />
//       <label htmlFor="cpass">Re-enter the Password: </label>
//       <input type="password" name="cpass" onChange={handleCpass}/> <br />
//       {err && <p>{err}</p>}
//       <label htmlFor="role">Role: </label>
//       <select name="role" id="" onChange={handleRole}>
//         <option value="Owner">Owner</option>
//         <option value="Admin">Admin</option>
//         <option value="Worker">Worker</option>
//       </select>
//       <p id="formErr"></p>
//       <button onClick={handleSubmit}>Register</button>
//     </div>
//   )
// }

// export default Register
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  document.title = "StockPulse - Register";
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [role, setRole] = useState("Owner");
  const [error, setError] = useState("");
  
  const nav = useNavigate();

  const handleSubmit = async () => {
    if (!name || !email || !password || !role) {
      setError("All fields are required");
      return;
    }

    if (password !== cpass) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Clear error on valid input

    const newUser = {
      Name: name,
      userName: email,
      passwd: password,
      Role: role,
    };

    try {
      const res = await axios.post("http://localhost:1234/User/Register", newUser);
      if (res.status === 200) {
        nav("/success");
        console.log("User registered successfully");
      }
    } catch (error) {
      console.error(error);
      setError("Registration failed, please try again");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

        {/* Name Input */}
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md mb-2"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email Input */}
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          className="w-full p-2 border rounded-md mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <label className="block text-gray-700">Password:</label>
        <input
          type="password"
          className="w-full p-2 border rounded-md mb-2"
          onChange={(e) => setPass(e.target.value)}
        />

        {/* Confirm Password Input */}
        <label className="block text-gray-700">Re-enter Password:</label>
        <input
          type="password"
          className="w-full p-2 border rounded-md mb-2"
          onChange={(e) => setCpass(e.target.value)}
        />

        {/* Role Selection */}
        <label className="block text-gray-700">Role:</label>
        <select
          className="w-full p-2 border rounded-md mb-2"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Owner">Owner</option>
          <option value="Admin">Admin</option>
          <option value="Worker">Worker</option>
        </select>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-4"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
