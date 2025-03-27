import React from 'react'
import { useNavigate } from 'react-router-dom'

function Headbar(){
    const nav = useNavigate()
  return (
    <div>
      <button onClick={()=>nav('/')}>DASHBOARD</button><br />
      <button onClick={()=>nav('/Inventory')}>INVENTORY</button><br />
      <button onClick={()=>nav('/Sales')}>SALES</button><br />
      <button onClick={()=>nav('/Purchase')}>PURCHASE</button><br />
      <button onClick={()=>nav('/Vendor')}>VENDOR</button><br />
      <button onClick={()=>nav('/Store')}>STORE</button><br />
      <button onClick={()=>nav('/User')}>USERS</button><br />
    </div>
  )
}

export default Headbar
