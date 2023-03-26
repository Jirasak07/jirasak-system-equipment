import { Outlet, Link } from "react-router-dom";
import "../Style/Layout.css";
import LogoKpru from "../assets/LOGO RGB PNG-สำหรับงานนำเสนอแบบดิจิติล.png";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import Headbar from "./Headbar/Headbar";
import React, { useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const chkLogin = () => {
    const token = localStorage.getItem("token");
    const Auth = async () => {
      const data = await fetch("http://localhost:4444/auth", {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "ok") {
            // navigate("/dashboard")
          } else {
            navigate("/login")
          }
        });
    };
    Auth().catch(console.error);
    // console.log("login")
  };
  useEffect(() => {
    chkLogin();
  },[]);
  return (
    <>
      <div className="container-layout d-flex flex-column flex-md-row layout ">
        <Headbar />
        <div className="content container-fluid  p-lg-2 p-2 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
