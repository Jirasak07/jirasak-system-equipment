import React from 'react'
import { useParams } from 'react-router-dom'

function CheckPD() {
  const {id} = useParams()
  return (
    <div className='pt-4 container '>
    <div className='bg-white rounded p-3' >CheckPD {id}</div>
    </div>
    
  )
}

export default CheckPD