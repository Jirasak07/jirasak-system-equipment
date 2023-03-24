import React, { useState } from "react";
import "../../Style/Layout.css";
import { Overlay } from "evergreen-ui";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaListUl, FaCoins, FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdManageAccounts, MdOutlineLogout } from "react-icons/md";
import imgLogo from "../../assets/LOGO RGB PNG-สำหรับงานนำเสนอแบบดิจิติล.png";
import { NavLink, useNavigate } from "react-router-dom";
import { BiQrScan } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import {HiOutlineDocumentSearch ,HiOutlineDocumentDownload} from "react-icons/hi";


function Headbar() {
  const [isShow, setIsShow] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const manage = () => {
    setIsActive(true);
    navigate("/check");
  };
  return (
    <>
      <div className="d-flex d-md-none headbar p-2 ">
        <div className="col-3 align-items-center d-flex">
          <GiHamburgerMenu
            style={{ fontSize: 25 }}
            onClick={() => setIsShow(!isShow)}
          />
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center head-title ">
          ระบบตรวจสอบครุภัณฑ์
        </div>
        <div className="col-3  d-flex justify-content-end align-items-center pr-5 menu">
          <FaUserCircle
            className="user-pic"
            onClick={() => setIsDown(!isDown)}
          />
          <div className={isDown ? "down actived " : "down "}>
            <div style={{ fontSize: 20 }}>จิรศักดิ์ สิงหบุตร</div>
            <div className="line2"></div>
            <div className="logout ">ออกจากระบบ</div>
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
          <div className="head-side d-flex flex-column justify-content-between align-items-center ">
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
            >
              <MdDashboard /> Dashboard
            </NavLink>
            <NavLink to="/product" className="navlink" activeClassName="active">
              <FaListUl /> ครุภัณฑ์ทั้งหมด
            </NavLink>
{/* 
            <div
              className="navlink" 
              onClick={() => {
                manage();
              }}
            >
              <FaCoins /> จัดการครุภัณฑ์ 
            </div>
            <div className="ml-2"  >
              <NavLink
                to="/check"
                className="navlink"
                activeClassName="active"
                onClick={() => setIsActive(true)}
                style={{ fontSize: 16 }}
              >
               <HiOutlineDocumentSearch/> ตรวจสอบครุภัณฑ์
              </NavLink>
              <NavLink
                to="/update"
                className="navlink"
                activeClassName="active"
                onClick={() => setIsActive(true)}
                style={{ fontSize: 16 }}
              >
              <HiOutlineDocumentDownload/>  อัพเดทครุภัณฑ์
              </NavLink>
            </div> */}

            <NavLink
              to="/scan"
              className="navlink"
              activeClassName="active"
              onClick={() => setIsActive(false)}
            >
              <BiQrScan /> สแกน QR Code
            </NavLink>
            <NavLink
              to="/manage-ac"
              className="navlink"
              activeClassName="active"
              onClick={() => setIsActive(false)}
            >
              <MdManageAccounts />
              จัดการผู้ใช้งาน
            </NavLink>
            <NavLink
              to="/report"
              className="navlink"
              activeClassName="active"
              onClick={() => setIsActive(false)}
            >
              <CgFileDocument /> ออกรายงาน
            </NavLink>
          </div>
          <div className="pb-4">
            <div
              className=" btn btn-sm d-none rounded d-md-block text-white"
              style={{ fontSize: 16 ,backgroundColor:"#ef233c"}}
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
