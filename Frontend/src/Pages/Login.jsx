// import React, { useState } from 'react'
// import axios from "axios"
// import Cookies from "js-cookie"
// import {useNavigate} from "react-router-dom"

// function Login(){
//     document.title = "StockPulse- Login"
//     const [username, setUname] = useState('')
//     const [passwd, setPasswd] = useState('')
//     const [err, setError] = useState('')
//     const navigate = useNavigate()

//     const handleUser = (e) =>{
//         setUname(e.target.value)
//     }
//     const handlePasswd = (e) =>{
//         setPasswd(e.target.value)
//     }
//     const handleLogin = async(e) =>{
//         const detail = {uName:username, Passwd:passwd}
//         try {
//             const res = await axios.post('http://localhost:1234/User/Login', detail)
//             console.log(res)
//             if (res.status === 202) {
//                 Cookies.set('username', res.data.id, {expires:null})
//                 navigate('/success')
//             }    
//         } catch (error) {
//             setError('Error in logging in')
//         }
//     }
//   return (
//     <div>
//         <label htmlFor="name">Userame: </label>
//         <input type="text" name="name" id="name" onChange={handleUser} /> <br />
//         <label htmlFor="passwd">Password: </label>
//         <input type="text" name="passwd" id="passwd" onChange={handlePasswd}/> <br />
//         <button id='submit' onClick={handleLogin}>Login</button>
//         {err && <p>{err}</p>}
//     </div> 
//   )
// }

// export default Login
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  document.title = "StockPulse - Login";
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page reload

    const details = { uName: username, Passwd: passwd };

    try {
      const res = await axios.post("http://localhost:1234/User/Login", details);

      if (res.status === 202) {
        Cookies.set("username", res.data.id, { expires: null });
        navigate("/success");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">StockPulse Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col">
          <label className="mb-1 text-gray-700">Username:</label>
          <input
            type="text"
            className="p-2 border rounded-md mb-3"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="mb-1 text-gray-700">Password:</label>
          <input
            type="password"
            className="p-2 border rounded-md mb-3"
            onChange={(e) => setPasswd(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
