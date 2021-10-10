import React, { useState } from 'react'
import Login from '../components/FormLogin.jsx'


export default function() {
  const [logged, setLogged] = useState(false)
  return (
    !logged 
    ? <Login />
    :(
      <div className="main">
      </div>
    )
  )
}