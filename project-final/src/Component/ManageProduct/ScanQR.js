import React from "react";
import { RxUpdate } from "react-icons/rx";
import { BsUiChecks } from "react-icons/bs";
import { BiQrScan } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import '../Product/PDStyle.css'
function ScanQR() {
  return (
    <div div className="w-100 h-100 py-5 d-flex align-items-center" >
      <div className="container-sm p-2 d-flex flex-column scan align-items-center" style={{ gap: 0,borderRadius:15,width:378 }}>
        <div
          className="p-3 d-flex flex-row justify-content-center align-items-center "
          style={{ fontSize: 24, gap: 10 }}
        >
          <BiQrScan /> เลือกสแกน QR COde
        </div>
        <div
          className="d-flex  w-100 flex-column  p-1 justify-content-center  "
          style={{ gap: 10 }}
        >
          <NavLink
            state={{ data: "อัพเดทข้อมูล", id: "1", color: "#4361ee" }}
            to="/scan/scanc"
            className=" d-flex flex-row col justify-content-center align-items-center "
            style={{
              gap: 10,
              fontSize: 22,
              minHeight: 150,
              borderRadius: 10,
              color: "#4361ee",
              fontWeight:"bolder",
              backgroundColor:'#d7e3fc'
            }}
          >
            <RxUpdate /> <div>อัพเดทข้อมูลครุภัณฑ์</div>
          </NavLink>
          <NavLink
            to="/scan/scanc"
            state={{ data: "ตรวจสอบ", id: "2", color: "#7b2cbf" }}
            className="d-flex flex-row col p-4 justify-content-center align-items-center  "
            style={{
              gap: 10,
              fontSize: 24,
              minHeight: 150,
              borderRadius: 10,
              color: "#5a189a",
              backgroundColor:'#f2ebfb',
            }}
          >
            <BsUiChecks /> ตรวจสอบครุภัณฑ์
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default ScanQR;
