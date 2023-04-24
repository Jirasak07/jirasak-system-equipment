import { Button } from "evergreen-ui";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfDocument from "./PdfDocument ";
import './Report.css'
import { useNavigate } from "react-router-dom";

function Report() {
  const navigate = useNavigate()
  const GoReport=(num)=>{
     var path = ""
    if(num == 1){
      path = "all"
    }else if(num == 2){
      path = "status"
    }else if(num == 3){
      path = "agen"
    }else if(num == 4){
      path = "fisicalyear"
    }else {
path = ""
    }
    navigate("/report/"+path)
  }
  return (
    <div className="p-3 ">
      <div
        className="p-5 "
        style={{
          borderRadius: 10,
          maxWidth: 600,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div className="text-center">รายงานการตรวจสอบครุภัณฑ์</div>
        <div
          className="d-flex row mt-2"
          style={{ justifyContent: "space-evenly"}}
        >
          <div className="p-2  col-6" style={{minHeight:100}} ><div onClick={GoReport(1)} style={{borderRadius:15}}  className=" h-100 p-2 report1 d-flex">ครุภัณฑ์ทั้งหมด</div></div>
          <div className="p-2  col-6"><div onClick={GoReport(2)}  className=" h-100 p-2 report2 d-flex" style={{borderRadius:15}} >ครุภัณฑ์ตามปีงบประมาณ</div></div>
          <div className="p-2  col-6" style={{minHeight:100}} ><div  onClick={GoReport(3)} className=" h-100 p-2 report3 d-flex" style={{borderRadius:15}} >ครุภัณฑ์ตามสถานะ</div></div>
          <div className="p-2  col-6"><div onClick={GoReport(4)}  className=" h-100 p-2 report4 d-flex" style={{borderRadius:15}} >ครุภัณฑ์ตามหน่วยงาน</div></div>
        </div>
      </div>
    </div>
  );
}

export default Report;
