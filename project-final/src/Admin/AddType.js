import React, { useEffect, useState } from 'react'
import { Button, TextInputField } from 'evergreen-ui';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL } from '../config';

function AddType() {
    const [typeName, setTypeName] = useState()
    const submit = () => {
        axios.post(URL+"/add-ptype",{
            ptype_name:typeName
           }).then((res)=>{
            if(res.data.status === "ok"){
              Swal.fire({
                icon:"success",
                timer:1000,
                timerProgressBar:true,
                showConfirmButton:false
              })
            }else if(res.data.status === "error"){
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
                <TextInputField label="ชื่อประเภท" value={typeName} onChange={(e) => { setTypeName(e.target.value) }} />
                <Button intent='success' appearance='primary' onClick={submit} >Save</Button>
            </div>

        </div>
    )
}

export default AddType