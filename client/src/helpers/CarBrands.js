import React from 'react'
import car_brands from './car_brands.json'

function CarBrands() {
  return (<>
    {car_brands.map((brand, key) => {
      return (
        <option value={brand.name} key={key}>{brand.name}</option>
      )})}
  </>)
}

export default CarBrands