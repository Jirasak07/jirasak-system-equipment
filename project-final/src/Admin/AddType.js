import React, { useEffect, useState } from 'react'
import { Button, TextInputField } from 'evergreen-ui';
import { axios } from 'axios';

function AddType() {
    const [typeName, setTypeName] = useState()
    const submit = () => {
        // axios.post("",{

        // }).then((res)=>{

        // })
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