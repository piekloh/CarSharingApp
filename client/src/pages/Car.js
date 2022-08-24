import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';

function Car() {

  let {id} = useParams();

  const [carObject, setCarObject] = useState({})

  useEffect(()=>{
    axios.get(`http://localhost:3001/cars/byId/${id}`).then((response)=>{
      setCarObject(response.data)
    })
  }, [])

  return (
    <>
    <div className='carInfo'>
      <div>Car{id}</div>
      <div>{carObject.brand}</div>
      <div>{carObject.gearbox}</div>
      <div>{carObject.image}</div>
    </div>
    <div className='comments'>
      
    </div>
    </>
  )
}

export default Car