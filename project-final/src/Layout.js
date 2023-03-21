import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import HeadNav from './NavBar/HeadNav'
function Layout() {
  return (
    <>
      <div className="container-layout d-flex flex-column flex-md-row layout ">
       <HeadNav/>
        <div className="content container-fluid p-lg-2 p-0 ">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
