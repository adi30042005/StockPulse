import React, { useState } from 'react'

function SearchEngine({SetSearch}){
    const handleSearch=(e)=>{
        setSearch(e.target.value)
    }
  return (
    <div>
        <input type="text" placeholder='Search' onChange={handleSearch}/>
    </div>
  )
}

export default SearchEngine