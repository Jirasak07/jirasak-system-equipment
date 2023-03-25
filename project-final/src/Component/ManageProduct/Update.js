import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TextInputField,
  TextareaField,
  SelectField,
  Button,
} from "evergreen-ui";
import axios from "axios";

function Update() {
  const [pstatus, setPstatus] = useState(1);
  const [said, setSaid] = useState(1);
  const [dataPstatus, setDataPstatus] = useState([]);
  const [dataSaid, setDataSaid] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios.get("http://localhost:4444/pstatus").then((res) => {
      setDataPstatus(res.data);
    });
    axios.get("http://localhost:4444/subagen").then((res) => {
      setDataSaid(res.data);
    });
    return () => {};
  }, []);
  return (
    <>
      <div className="container pt-4 d-flex flex-row justify-content-center ">
        <div
          className="bg-white card p-4 w-100"
          style={{ minWidth: 375, maxWidth: 700 }}
        >
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div
              className="p-2"
              style={{
                backgroundColor: "#caf0f8",
                width: "fit-content",
                borderRadius: 10,
                color: "#0077b6",
                fontWeight: 500,
                fontSize: 18,
              }}
            >
              อัพเดทข้อมูลครุภัณฑ์หมายเลข {id}
            </div>
            <div className="d-flex flex-column">
              <TextInputField className="mt-2" type="file" />
              <SelectField label="หน่วยงานที่ติดตั้ง"
              value={said}
              onChange={(e)=>setSaid(e.target.value)}
              >
                {dataSaid.map((it,index)=>(
                  <option key={index} value={it.sub_aid}>{it.sub_aname}</option>
                ))}
              </SelectField>
              <SelectField label="สถานะครุภัณฑ์">
                {dataPstatus.map((it,index)=>(
                  <option key={index} value={it.pstatus_id} > {it.pstatus_name} </option>
                ))}
              </SelectField>
              <TextareaField
                label="รายละเอียดที่อยู่"
                required
                lineHeight={0}
              />
            </div>
            <div>
              <Button appearance="primary" intent="success">
                บันทึกการอัพเดท
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Update;
