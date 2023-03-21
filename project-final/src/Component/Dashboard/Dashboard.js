import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { GoChecklist } from "react-icons/go";
import { AiFillDatabase } from "react-icons/ai";
import { ImClock2 } from "react-icons/im";
import { BiTime } from "react-icons/bi";
import BarChart from "../Chart/BarChart";
import PieChart from "../Chart/PieChart";

function Dashboard() {
  useEffect(() => {
    console.log("mouth");
    return () => {
      console.log("unmouth");
    };
  }, []);
  return (
    <div className="px-md-5 px-0  py-4 bg-danger ">
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
              <div className="card-text">ตรวจสอบได้</div>
              <div className="text-incard">
                <div className=" resualt ">0</div>
                <div>รายการ</div>
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
                <div className=" resualt ">0</div>
                <div>รายการ</div>
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
              <div className="card-text">รอตรวจสอบ</div>
              <div className="text-incard">
                <div className=" resualt ">0</div>
                <div>รายการ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4 ">
        <div className="d-flex flex-row bg-white" style={{ borderRadius: 15 }}>
          <div className="col-8">
            <div className=" p-4">
              <BarChart />
            </div>
          </div>
          <div className=" col-4 ">
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
