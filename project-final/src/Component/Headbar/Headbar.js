import React, { useState } from "react";
import "../../Style/Layout.css";
import { Overlay } from "evergreen-ui";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaListUl, FaCoins, FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdManageAccounts, MdOutlineLogout } from "react-icons/md";
import imgLogo from "../../assets/LOGO RGB PNG-สำหรับงานนำเสนอแบบดิจิติล.png";
import { HiTable } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { BiQrScan } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { FaPowerOff } from "react-icons/fa";
import {
  HiOutlineDocumentSearch,
  HiOutlineDocumentDownload,
} from "react-icons/hi";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { URL } from "../../config";

function Headbar() {
  const [isShow, setIsShow] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState("name");
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const manage = () => {
    setIsActive(true);
    navigate("/check");
  };
  const navLink=()=>{
    setIsActive(false)
    setIsShow(false)
  }
  const Logout = () => {
    Swal.fire({
      icon: "info",
      timer:500,
      text:'กำลังออกจากระบบ',
      showConfirmButton:false,
      timerProgressBar:true
    }).then((res) => {
      localStorage.removeItem("main_aid");
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      navigate("/login");
    });
  };
  useEffect(() => {
    axios
      .post(URL+"/username", {
        user_id: user_id,
      })
      .then((res) => {
        setUsername(res.data[0].name);
      });
  });
  const home = () =>{
    navigate("/dashboard")
    setIsShow(false)
  }
  return (
    <>
      <div
        className="d-flex  d-md-none  p-3  text-white"
        style={{ backgroundColor: "#1d3557" }}
      >
        <div className="col-3 align-items-center d-flex">
          <GiHamburgerMenu
            style={{ fontSize: 25 }}
            onClick={() => setIsShow(!isShow)}
          />
        </div>
        <div onClick={home} className="col-7  d-flex justify-content-center align-items-center pr-5">
          <div style={{ fontSize: 16 }}>{username}</div>
        </div>
        <div className="col-2">
          <div className="button-logout" onClick={Logout}>
            <FaPowerOff />
          </div>
        </div>
      </div>
      <div
        className={
          isShow
            ? "sidebar unact  zhead d-md-flex text-dark"
            : "sidebar  d-md-flex zhead text-dark"
        }
      >
        <GiHamburgerMenu
          style={{ fontSize: 25 }}
          onClick={() => setIsShow(!isShow)}
          className="menuBar d-block d-md-none"
        />
        <div className="d-flex flex-column h-100 ">
          <div onClick={home} className="head-side d-flex flex-column justify-content-between align-items-center ">
            <img src={imgLogo} className="img-logonav" />
            <div className="mt-3" style={{ fontSize: 20 }}>
              ระบบตรวจสอบครุภัณฑ์
            </div>
          </div>
          <div className="line"></div>
          <div className="body-side ">
            <NavLink
              to="/dashboard"
              activeClassName="active"
              className="navlink"
              onClick={() => navLink() }
            >
              <MdDashboard /> Dashboard
            </NavLink>
            <NavLink to="/product" className="navlink" activeClassName="active"    onClick={() => navLink() }>
              <FaListUl /> ครุภัณฑ์ทั้งหมด
            </NavLink>
            <NavLink
              to="/scan"
              className="navlink"
              activeClassName="active"
              onClick={() => navLink() }
            >
              <BiQrScan /> สแกน QR Code
            </NavLink>
            <NavLink
              to="/manage-ac"
              className="navlink"
              activeClassName="active"
              onClick={() => navLink() }
            >
              <MdManageAccounts />
              จัดการผู้ใช้งาน
            </NavLink>
            <NavLink
              to="/manage-ag"
              className="navlink"
              activeClassName="active"
              onClick={() => navLink() }
            >
              <HiTable />
              จัดการหน่วยงาน
            </NavLink>
            <NavLink
              to="/report"
              className="navlink"
              activeClassName="active"
              onClick={() => navLink() }
            >
              <CgFileDocument /> ออกรายงาน
            </NavLink>
          </div>
          <div className="pb-4">
            <div
              className=" btn btn-sm d-none rounded d-md-block text-white"
              style={{ fontSize: 16, backgroundColor: "#ef233c" }}
              onClick={Logout}
            >
              {" "}
              <MdOutlineLogout /> ออกจากระบบ
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Headbar;
