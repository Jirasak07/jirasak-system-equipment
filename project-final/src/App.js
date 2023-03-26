import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Auth/LoginPage";
import ManageAc from "./Component/Account/ManageAc";
import Dashboard from "./Component/Dashboard/Dashboard";
import Layout from "./Component/Layout";
import CheckPD from "./Component/ManageProduct/CheckPD";
import QRCodeScan from "./Component/ManageProduct/QRCodeScan";
import ScanQR from "./Component/ManageProduct/ScanQR";
import Update from "./Component/ManageProduct/Update";
import EditPD from "./Component/Product/EditPD";
import Product from "./Component/Product/Product";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/check/:id" element={<CheckPD />} />
          <Route path="/product/update/:id" element={<Update />} />
          <Route path="/scan" element={<ScanQR />} />
          <Route path="/edit/:id" element={<EditPD />} />
          <Route path="/manage-ac" element={<ManageAc />} />
          <Route path="/scan/scanc" element={<QRCodeScan />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
