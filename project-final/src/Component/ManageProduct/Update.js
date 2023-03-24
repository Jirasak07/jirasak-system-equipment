import React from 'react'
import { useParams } from 'react-router-dom';

function Update() {
    const {id} = useParams()
  return (
    <>
    <div className='container pt-4'>
            <div className='bg-white card p-4'>Update {id}</div>
    </div>
  
    </>
  
  )
}

export default Update