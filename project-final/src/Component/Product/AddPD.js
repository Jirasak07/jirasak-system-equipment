import React from "react";
import { MDBInput } from "mdbreact";
function AddPD() {
  return (
    <>
      <div className="container">
        <div className="d-flex flex-column" style={{ gap: 5 }}>
          <div className="d-flex flex-row">
            <div className="col-6">
              <MDBInput label="หมายเลขครุภัณฑ์" className="col-12" />
            </div>
            <div className="col-6">
              <MDBInput label="รายการ" className="col-12" />
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="col-6">
              <MDBInput label="ประเภทครุภัณฑ์" className="col-12" />
            </div>
            <div className="col-6">
              <MDBInput label="คุณลักษณะ" className="col-12" />
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="col-3">
              <MDBInput label="จำนวน" className="col-12" />
            </div>
            <div className="col-3">
              <MDBInput label="หน่วย" className="col-12" />
            </div>
            <div className="col-6">
              <MDBInput label="ราคา (บาท)" className="col-12" />
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="col-6">
              <MDBInput label="ประเภทเงิน" className="col-12" />
            </div>
            <div className="col-6">
              <MDBInput label="ผู้ขาย" className="col-12" />
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="col-6">
              <MDBInput label="ที่มาครุภัณฑ์" className="col-12" />
            </div>
            <div className="col-6">
              <MDBInput label="ปีงบประมาณ" className="col-12" />
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="col-6">
              <MDBInput label="วันเดือนปีที่ซื้อ" className="col-12" />
            </div>
            <div className="col-6">
              <MDBInput label="วันเดือนปีที่รับ" className="col-12" />
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="col-6">
              <MDBInput label="หน่วยงานที่ติดตั้ง" className="col-12" />
            </div>
            <div className="col-6">
              <MDBInput label="สถานะครุภัณฑ์" className="col-12" />
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="col-12 bg-white shadow p-3">
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPD;
