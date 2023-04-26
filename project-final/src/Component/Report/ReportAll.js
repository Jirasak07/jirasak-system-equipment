import { Button, SelectField } from "evergreen-ui";
import React, { useState } from "react";

function ReportAll() {
  const [SelectReport,setSelectReport] = useState()
  const long=()=>{
    window.open('http://localhost:83/PDF/TCPDF-main/testB.php?y=2560', '_blank', 'noreferrer');
  }
  return (
    <div className="row">
      <div className="col-8">
        <SelectField>
          <option>ครุภัณฑ์ที่มีทั้งหมด</option>
          <option>ครุภัณฑ์ที่มีการใช้งาน</option>
        </SelectField>
      </div>
      <div className="col-4 pt-2">
        <Button appearance="primary" intent="success" onClick={long} >
          เลือก
        </Button>
      </div>
    </div>
  );
}

export default ReportAll;
