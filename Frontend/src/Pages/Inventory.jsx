import React, { useState } from 'react'
import SearchEngine, {Search} from '../assets/Components/SearchEngine'

function Inventory(){
    const [Search, setSearch] = useState('')
  return (
    <div>
      <SearchEngine SetSearch={setSearch}/>

    </div>
  )
}

export default Inventory
