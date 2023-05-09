import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { GoChecklist } from "react-icons/go";
import { AiFillDatabase } from "react-icons/ai";
import { ImClock2 } from "react-icons/im";
import { BiTime } from "react-icons/bi";
import BarChart from "../Chart/BarChart";
import PieChart from "../Chart/PieChart";
import axios from "axios";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdbreact";
import { MDBDataTableV5 } from "mdbreact";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { NavLink } from "react-router-dom";
import {URL} from '../../config'
function Dashboard() {
  const [canchk, setCanChk] = useState(null);
  const [checked, setChecked] = useState(null);
  const [dataUse, setDataUse] = useState([]);
  const [dataChk, setDataChk] = useState();
  const [wait, setWait] = useState(null);
  const [allitems, setAllItems] = useState();
  const date = new Date();
  const month = new Date(date).getMonth() + 1;
  const currentYear = new Date(date).getFullYear();
  const [fisiyear, setFisiYear] = useState(null);
  const [dataTest, setDataTest] = useState([]);
  
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  useEffect(() => {
    const use = [];
    const main = localStorage.getItem("main_aid");
    if (month >= 10) {
      setFisiYear(currentYear + 544);
    } else {
      setFisiYear(currentYear + 543);
    }
    axios
      .post(URL+"/use", {
        main_aid: main,
      })
      .then((res) => {
        setDataUse(res.data);
      });
    axios
      .post(URL+"/allitem", {
        main_aid: main,
      })
      .then((res) => {
        setAllItems(res.data[0].allqty);
      });
    return () => {
      console.log("unmouth");
    };
  }, []);
  const fetchChk = () => {
    axios
      .post(URL+"/checked", {
        year: fisiyear,
      })
      .then((res) => {
        setChecked(res.data[0].checked);
      });
    var qty = 0;
    console.log(allitems);
    dataUse.forEach((item, index) => {
      if (item.status != 3 && item.status != 5) {
        qty = qty + item.qty;
      }
      console.log(qty);
      setCanChk(qty);
    });
  };
  useEffect(() => {
    fetchChk();
    setWait(canchk - checked);
  });
  return (
    <div className="container-fluid">
       <div>
      <Breadcrumbs aria-label="breadcrumb">
        <NavLink underline="hover" color="inherit" to="/dashboard">
          Home
        </NavLink>
        <Typography color="text.primary">Dashboard</Typography>
      </Breadcrumbs>
    </div>
      <div
        className="d-flex row   py-3  text-inf justify-content-around "
        style={{ borderRadius: 15 }}
      >
        <div className="col-12 col-xl-6 pb-3   card-data">
          <div className="box-all bg-white   h-100 p-4 card-info ">
            <div className="col-4 icon-card  ">
              <AiFillDatabase />
            </div>
            <div className="col-8 text-card  ">
              <div className="card-text">ครุภัณฑ์ทั้งหมด</div>
              <div className="text-incard">
                <div className=" resualt ">{allitems}</div>
                <div>หน่วย</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-6 pb-3   card-data">
          <div className="box-all-use bg-white    h-100 p-4 card-info ">
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
        <div className="col-12 col-xl-6 pb-3  card-data">
          <div className="box-check bg-white    h-100 p-4 card-info ">
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
        <div className="col-12 col-xl-6 pb-3 card-data">
          <div className="box-wait bg-white   h-100 p-4 card-info ">
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
      <div className="px-3">
        <div
          className="d-flex row bg-white justify-content-center"
          style={{ borderRadius: 15 }}
        >
          <div
            className="col-12 col-lg-4"
            style={{ maxWidth: 450, maxHeight: 450 }}
          >
            {" "}
            <PieChart />{" "}
          </div>
          <div
            className="col-12 col-lg-8"
            style={{ minWidth: 350, minHeight: 250 }}
          >
            {" "}
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
