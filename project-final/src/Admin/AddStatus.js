import React, { useEffect, useState } from 'react'
import { Button, TextInputField } from 'evergreen-ui';
import axios from 'axios';
import { URL } from './../config';
import Swal from 'sweetalert2';

function AddStatus() {
    const [statusName,setStatusName] = useState()
    const submit=()=>{
       axios.post(URL+"/add-pstatus",{
        pstatus_name:statusName
       }).then((res)=>{
      console.log(res)
        if(res.data.status == "ok"){
          Swal.fire({
            icon:"success",
            timer:1000,
            timerProgressBar:true,
            showConfirmButton:false
          })
        }else if(res.data.status == "error"){
          Swal.fire({
            icon:"error",
            timer:1000,
            timerProgressBar:true,
            showConfirmButton:false
          })
        }
       })
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