import React from "react";
import { RxUpdate } from "react-icons/rx";
import { BsUiChecks } from "react-icons/bs";
import { BiQrScan } from "react-icons/bi";
import { NavLink } from "react-router-dom";
function ScanQR() {
  return (
    <>
      <div className="container-sm pt-4 d-flex flex-column" style={{ gap: 20 }}>
        <div
          className="bg-white card p-3 d-flex flex-row justify-content-center align-items-center "
          style={{ fontSize: 28, gap: 10 }}
        >
          <BiQrScan /> สแกน QR COde
        </div>
        <div
          className="bg-white card p-3 d-flex flex-row justify-content-center "
          style={{ gap: 10 }}
        >
          <NavLink
            state={{ data: "อัพเดทข้อมูล", id: "1" ,color:"#4361ee"}}
            to="/scan/scanc"
            className="btn d-flex flex-row card bg-info col  p-4 text-white justify-content-center align-items-center "
            style={{ gap: 10, fontSize: 20 }}
          >
            <RxUpdate /> อัพเดทข้อมูลครุภัณฑ์
          </NavLink>
          <NavLink
            to="/scan/scanc"
            state={{ data: "ตรวจสอบ", id: "2",color:"#7b2cbf" }}
            className="btn d-flex flex-row card bg-secondary  col p-4 text-white justify-content-center align-items-center "
            style={{ gap: 10, fontSize: 20 }}
          >
            <BsUiChecks /> ตรวจสอบครุภัณฑ์
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default ScanQR;
