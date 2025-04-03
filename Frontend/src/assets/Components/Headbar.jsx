import React from "react";
import { FaStore } from "react-icons/fa"; // Example logo icon
import { FaUserCircle } from "react-icons/fa";

function Headbar() {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      {/* Left Side: Logo */}
      <div className="flex items-center gap-2">
        <FaStore className="text-2xl" />
        <span className="text-xl font-bold">StockPulse</span>
      </div>

      {/* Right Side: Profile Icon */}
      <div>
        <FaUserCircle className="text-3xl cursor-pointer hover:text-gray-400" />
      </div>
    </div>
  );
}

export default Headbar;
