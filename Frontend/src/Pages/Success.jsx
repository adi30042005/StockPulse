import React from 'react'
import Cookies from "js-cookie"
function Success (){
  return (
    <div>
      <h1>Login / Register Success</h1>
      <p>{Cookies.get('username')}</p>
    </div>
  )
}

export default Success
