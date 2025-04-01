// import React, { useState } from 'react'

// function SearchEngine({SetSearch}){
//     const handleSearch=(e)=>{
//         setSearch(e.target.value)
//     }
//   return (
//     <div>
//         <input type="text" placeholder='Search' onChange={handleSearch}/>
//     </div>
//   )
// }

// export default SearchEngine

import React from "react";

function SearchEngine({ setSearch }) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchEngine;
