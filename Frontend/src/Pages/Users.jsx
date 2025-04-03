// import React, { useEffect, useState } from 'react'
// import Cookie from "js-cookie"
// import { useNavigate } from 'react-router-dom';
// import axios from "axios"
// function Users(){
//     const [data, setData] = useState()
//     const [Opasswd, setOPasswd] = useState('')
//     const [Npass, setNPasswd] = useState('')
//     const [CNpass, setCNPasswd] = useState('')
//     const [opt, setOpt] = useState('')
//     const [success, setSuc] = useState('')
//     const nav = useNavigate();
//     const username = Cookie.get("username");
//     if (!username) return nav('/Login');
//     useEffect(()=>{
//         axios.get(`http://localhost:1234/User/username/${username}`)
//         .then((res)=>{
//             if (res.status === 201) setData(res.data);
//         })
//     },[])

//     const handlePass =()=>{
//         if (Npass === CNpass && data['passwd'] === Opasswd){
//             axios.get(`http://localhost:1234/User/changePasswd/${Npass}`)
//             .then((res)=>{
//                 if (res.status === 204) setSuc('Password Changed Successfully');
//             })
//         }
//     }

//   return (
//     <div>
//       {data && <p>{data}</p>}
//       <button onClick={()=>setOpt('Change Password')}>Change Password</button>
//       {opt && <form action="">
//         Enter Old Password: <input type='password' onChange={(e)=>setOPasswd(e.target.value)}/>
//         Enter New Password: <input type='password' onChange={(e)=>setNPasswd(e.target.value)}/>
//         Re-Enter New Password: <input type='password' onChange={(e)=>setCNPasswd(e.target.value)}/>
//         <button onClick={handlePass}>Change Password</button>
//       </form>}
//       {success && <p>{success}</p>}
//     </div>
//   )
// }

// export default Users
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Users() {
  const [data, setData] = useState(null);
  const [Opasswd, setOPasswd] = useState("");
  const [Npass, setNPasswd] = useState("");
  const [CNpass, setCNPasswd] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const username = Cookie.get("username");

  if (!username) {
    navigate("/Login");
    return <div></div>;
  }

  useEffect(() => {
    axios
      .get(`http://localhost:1234/User/username/${username}`)
      .then((res) => {
        if (res.status === 201) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [username]);

  const handlePassChange = async () => {
    if (!Opasswd || !Npass || !CNpass) {
      setMessage("All fields are required");
      return;
    }
    if (Npass !== CNpass) {
      setMessage("New passwords do not match");
      return;
    }
    if (data.passwd !== Opasswd) {
      setMessage("Old password is incorrect");
      return;
    }

    try {
      const res = await axios.patch(`http://localhost:1234/User/changePasswd`, {
        username,
        newPassword: Npass,
      });

      if (res.status === 204) {
        setMessage("Password Changed Successfully");
        setShowForm(false);
      }
    } catch (error) {
      setMessage("Failed to change password");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>

      {data ? (
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">User ID</th>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Username</th>
              <th className="border border-gray-400 px-4 py-2">Role</th>
              <th className="border border-gray-400 px-4 py-2">Store Access</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 px-4 py-2">{data._id}</td>
              <td className="border border-gray-400 px-4 py-2">{data.Name}</td>
              <td className="border border-gray-400 px-4 py-2">{data.userName}</td>
              <td className="border border-gray-400 px-4 py-2">{data.Role}</td>
              <td className="border border-gray-400 px-4 py-2">
                {Array.isArray(data.StoreAccess) ? data.StoreAccess.join(", ") : "All"}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={() => setShowForm(!showForm)}
      >
        Change Password
      </button>

      {showForm && (
        <div className="mt-4 p-4 border rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-2">Change Password</h3>
          <input
            type="password"
            placeholder="Enter Old Password"
            className="border p-2 w-full mb-2"
            onChange={(e) => setOPasswd(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter New Password"
            className="border p-2 w-full mb-2"
            onChange={(e) => setNPasswd(e.target.value)}
          />
          <input
            type="password"
            placeholder="Re-Enter New Password"
            className="border p-2 w-full mb-2"
            onChange={(e) => setCNPasswd(e.target.value)}
          />
          <button
            onClick={handlePassChange}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Change Password
          </button>
        </div>
      )}

      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
  );
}

export default Users;
