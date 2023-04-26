import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Auth/LoginPage";
import ManageAc from "./Component/Account/ManageAc";
import ManageAgen from "./Component/Agen/ManageAgen";
import Dashboard from "./Component/Dashboard/Dashboard";
import Layout from "./Component/Layout";
import CheckPD from "./Component/ManageProduct/CheckPD";
import QRCodeScan from "./Component/ManageProduct/QRCodeScan";
import ScanQR from "./Component/ManageProduct/ScanQR";
import Update from "./Component/ManageProduct/Update";
import EditPD from "./Component/Product/EditPD";
import Product from "./Component/Product/Product";
import Report from "./Component/Report/Report";
import { useEffect } from "react";
import ReportAll from "./Component/Report/ReportAll";
import ReportAgen from "./Component/Report/ReportAgen";
import ReportStatus from "./Component/Report/ReportStatus";
import ReportFisicalyear from "./Component/Report/ReportFisicalyear";

function App() {
 useEffect(() => {
  console.log("wellcom !!")
  return () => {
 console.log("Good Bye :)")   
  };
 }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/check/:id" element={<CheckPD />} />
          <Route path="/product/update/:id" element={<Update />} />
          <Route path="/scan" element={<ScanQR />} />
          <Route path="/product/edit/:id" element={<EditPD />} />
          <Route path="/manage-ac" element={<ManageAc />} />
          <Route path="/scan/scanc" element={<QRCodeScan />} />
          <Route path="/manage-ag" element={<ManageAgen/>} />
          <Route path="/report" element={<Report/>} />
        </Route>
        <Route path="/login" element={<LoginPage />}  />
      </Routes>
    </div>
  );
}

export default App;
