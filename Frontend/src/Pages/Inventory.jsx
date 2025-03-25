import React, { useState } from 'react'
import SearchEngine from '../assets/Components/SearchEngine'

function Inventory(){
    const [Search, setSearch] = useState('')
  return (
    <div>
      <h1>HE</h1>
      <SearchEngine SetSearch={setSearch}/>
      
    </div>
  )
}

export default Inventory
