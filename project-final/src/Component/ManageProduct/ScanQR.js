import React from "react";
import { RxUpdate } from "react-icons/rx";
import { BsUiChecks } from "react-icons/bs";
import { BiQrScan } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import "../Product/PDStyle.css";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
function ScanQR() {
  return (
    <div className="container-fluid">
      <div>
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink underline="hover" color="inherit" to="/product">
            Home
          </NavLink>
          <Typography color="text.primary">Scan QR Code</Typography>
        </Breadcrumbs>
      </div>
      <div
        className="align-items-center d-flex flex-column mt-3 justify-content-center rounded"
        style={{ gap: 0 }}
      >
        <div
          className="p-3 d-flex flex-row justify-content-center align-items-center "
          style={{ fontSize: 24, gap: 10 }}
        >
          <BiQrScan /> เลือกสแกน QR COde
        </div>
        <div
          className="d-flex  flex-column bg-white  p-3 rounded justify-content-center  "
          style={{ gap: 10, borderRadius: 15, width: 378 }}
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
              fontWeight: "bolder",
              backgroundColor: "#d7e3fc",
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
              backgroundColor: "#f2ebfb",
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
