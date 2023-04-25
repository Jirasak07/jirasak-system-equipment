import { Button } from "evergreen-ui";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfDocument from "./PdfDocument ";
import { Pane, Dialog } from "evergreen-ui";
import "./Report.css";
import { NavLink, useNavigate } from "react-router-dom";
import ReportAll from "./ReportAll";
import ReportAgen from "./ReportAgen";
import ReportFisicalyear from "./ReportFisicalyear";
import ReportStatus from "./ReportStatus";

function Report() {
  const navigate = useNavigate();
  const [isAll, setIsAll] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [isAgen, setIsAgen] = useState(false);
  const [isFisical, setIsFisical] = useState(false);
  const GoAll = () => {
    setIsAll(!isAll);
  };
  const GoStatus = () => {
    setIsStatus(!isStatus);
  };
  const GoAgen = () => {
    setIsAgen(!isAgen);
  };
  const GoFisical = () => {
    setIsFisical(!isFisical);
  };
  return (
    <div className="p-3 ">
      <div
        className="p-5 bg-white"
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
          style={{ justifyContent: "space-evenly" }}
        >
          <div className="p-2  col-md-6 col-12" style={{ minHeight: 100 }}>
            <div
              onClick={GoAll}
              style={{ borderRadius: 15 }}
              className=" h-100 p-2 report1 d-flex"
            >
              ครุภัณฑ์ทั้งหมด
            </div>
          </div>
          <div className="p-2  col-md-6 col-12" style={{ minHeight: 100 }}>
            <div
            onClick={GoFisical}
              className=" h-100 p-2 report2 d-flex"
              style={{ borderRadius: 15 }}
            >
              ครุภัณฑ์ตามปีงบประมาณ
            </div>
          </div>
          <div className="p-2  col-md-6 col-12" style={{ minHeight: 100 }}>
            <div
             onClick={GoStatus}
              className=" h-100 p-2 report3 d-flex"
              style={{ borderRadius: 15 }}
            >
              ครุภัณฑ์ตามสถานะ
            </div>
          </div>
          <div className="p-2  col-md-6 col-12" style={{ minHeight: 100 }}>
            <div
            onClick={GoAgen}
              className=" h-100 p-2 report4 d-flex"
              style={{ borderRadius: 15 }}
            >
              ครุภัณฑ์ตามหน่วยงาน
            </div>
          </div>
        </div>
      </div>
      <Pane>
        <Dialog
          isShown={isAll}
          title="เลือกออกรายงานครุภัณฑ์"
          onCloseComplete={() => setIsAll(false)}
          footer={true}
        >
          <ReportAll />
        </Dialog>
      </Pane>
      <Pane>
        <Dialog
          isShown={isAgen}
          title="เลือกออกรายงานครุภัณฑ์"
          onCloseComplete={() => setIsAgen(false)}
          footer={true}
        >
          <ReportAgen />
        </Dialog>
      </Pane>
      <Pane>
        <Dialog
          isShown={isFisical}
          title="เลือกออกรายงานครุภัณฑ์"
          onCloseComplete={() => setIsFisical(false)}
          footer={true}
        >
          <ReportFisicalyear />
        </Dialog>
      </Pane>
      <Pane>
        <Dialog
          isShown={isStatus}
          title="เลือกออกรายงานครุภัณฑ์"
          onCloseComplete={() => setIsStatus(false)}
          footer={true}
        >
          <ReportStatus />
        </Dialog>
      </Pane>
    </div>
  );
}

export default Report;
