import React from 'react'

function FoundCar({cars, foundCars}) {
  return (
    <div>
            {foundCars.map((car) => (
                <div>
                    <p>Car: {car.model}</p>
                </div>
            ))}
    </div>
  )
}

export default FoundCar