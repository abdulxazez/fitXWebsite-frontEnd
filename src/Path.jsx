import React from 'react'
import { useLocation } from 'react-router-dom'
function Path() {
    const location = useLocation()
  return (
    <div className='' style={{backgroundColor: "black"}}>
        <h6 className='text-light ms-3'>{location.pathname}</h6>

    </div>
  )
}

export default Path