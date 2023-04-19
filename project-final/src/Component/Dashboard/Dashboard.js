import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { GoChecklist } from "react-icons/go";
import { AiFillDatabase } from "react-icons/ai";
import { ImClock2 } from "react-icons/im";
import { BiTime } from "react-icons/bi";
import BarChart from "../Chart/BarChart";
import PieChart from "../Chart/PieChart";
import axios from "axios";
function Dashboard() {
  const [canchk, setCanChk] = useState(null);
  const [checked, setChecked] = useState(null);
  const [wait, setWait] = useState(null);
  const date = new Date();
  const month = new Date(date).getMonth() + 1;
  const currentYear = new Date(date).getFullYear();
  const [fisiyear, setFisiYear] = useState(null);
  useEffect(() => {
    if (month >= 10) {
      setFisiYear(currentYear + 544);
    } else {
      setFisiYear(currentYear + 543);
    }
    axios.get("http://localhost:4444/can-check").then((res) => {
      setCanChk(res.data[0].cancheck);
    });

    axios
      .post("http://localhost:4444/checked", {
        year: fisiyear,
      })
      .then((res) => {
        setChecked(res.data[0].checked);
        setWait(canchk-res.data[0].checked);
      });
    return () => {
      console.log("unmouth");
    };
  });
  return (
    <div className="px-md-5 px-0  py-4 ">
      <div
        className=" bg-white d-flex flex-xl-row flex-column  py-3 px-3  text-inf justify-content-around "
        style={{ borderRadius: 15 }}
      >
        <div className="col-xl-4 col-lg-12 col-md-12 col-12 py-2   card-data">
          <div className="box-all   h-100 p-4 card-info ">
            <div className="col-4 icon-card  ">
              <AiFillDatabase />
            </div>
            <div className="col-8 text-card  ">
              <div className="card-text">ครุภัณฑ์ใช้งานอยู่</div>
              <div className="text-incard">
                <div className=" resualt ">{canchk}</div>
                <div>หน่วย</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 col-md-12 col-12 py-2  card-data">
          <div className="box-check   h-100 p-4 card-info ">
            <div className="col-4 icon-card  ">
              <GoChecklist />
            </div>
            <div className="col-8 text-card  ">
              <div className="card-text">ตรวจสอบแล้ว</div>
              <div className="text-incard">
                <div className=" resualt ">{checked}</div>
                <div>หน่วย</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 col-md-12 col-12 py-2 card-data">
          <div className="box-wait   h-100 p-4 card-info ">
            <div className="col-4 icon-card  ">
              <ImClock2 />
            </div>
            <div className="col-8 text-card  ">
              <div className="card-text">รอการตรวจสอบ</div>
              <div className="text-incard">
                <div className=" resualt ">{wait}</div>
                <div>หน่วย</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4 ">
        <div
          className="d-flex flex-xl-row flex-column bg-white"
          style={{ borderRadius: 15 }}
        >
          <div className="col-12 col-xl-8" style={{ overflow: "auto" }}>
            <div className=" p-4" style={{ height: 450, width: 850 }}>
              <BarChart />
            </div>
          </div>
          <div className=" col-12 col-xl-4 ">
            <div className="p-4">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
