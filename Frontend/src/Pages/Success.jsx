//   import React from 'react'
// import Cookies from "js-cookie"
// function Success (){
//   return (
//     <div>
//       <h1>Login / Register Success</h1>
//       <p>{Cookies.get('username')}</p>
//     </div>
//   )
// }

// export default Success
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Success() {
  const [username, setUsername] = useState(Cookies.get("username") || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [username, navigate]);

  const handleLogout = () => {
    Cookies.remove("username"); // Remove session
    setUsername("");
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login / Register Success</h1>
      <p className="text-lg text-gray-600 mb-4">
        {username ? `Welcome, ${username}!` : "Redirecting to login..."}
      </p>
      {username && (
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Success;
