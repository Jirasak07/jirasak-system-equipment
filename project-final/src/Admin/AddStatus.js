import React, { useEffect, useState } from 'react'
import { Button, TextInputField } from 'evergreen-ui';
import { axios } from 'axios';

function AddStatus() {
    const [statusName,setStatusName] = useState()
    const submit=()=>{
        // axios.post("",{

        // }).then((res)=>{

        // })
    }
  return (
    <div className='container pt-3 d-flex justify-content-center ' >
            <div className="card w-50 p-4">
                <TextInputField label="ชื่อสถานะ" value={statusName} onChange={(e) => { setStatusName(e.target.value) }} />
                <Button intent='secondary' appearance='primary' onClick={submit} >Save</Button>
            </div>

        </div>
  )
}

export default AddStatus