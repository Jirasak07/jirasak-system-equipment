import { Outlet, Link } from "react-router-dom";
import "../Style/Layout.css";
import LogoKpru from "../assets/LOGO RGB PNG-สำหรับงานนำเสนอแบบดิจิติล.png";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import Headbar from "./Headbar/Headbar";

const Layout = () => {
  return (
    <>
      <div className="container-layout d-flex flex-column flex-md-row layout ">
        <Headbar  />
        <div className="content container-fluid p-lg-2 p-0 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
