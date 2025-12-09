import React from 'react'
import { UserQuantityContext } from './Context/UserQuantityContext'
import { useContext } from 'react';
function FoundCar() {
  const {quantity, setQuantity} = useContext(UserQuantityContext);
  return (
    <div>
          <button onClick={()=>{setQuantity(quantity+1)}}>Increment</button>
          <h6>{quantity}</h6>
          <button onClick={()=>{setQuantity(quantity+1)}}>Decrement</button>
    </div>
  )
}

export default FoundCar;