import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ManageAc from "./Component/Account/ManageAc";
import Dashboard from "./Component/Dashboard/Dashboard";
import Layout from "./Component/Layout";
import CheckPD from "./Component/ManageProduct/CheckPD";
import ScanQR from "./Component/ManageProduct/ScanQR";
import EditPD from "./Component/Product/EditPD";
import Product from "./Component/Product/Product";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Product/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/product" element={<Product/>} />
          <Route path="/check" element={<CheckPD/>} />
          <Route path="/scan" element={<ScanQR/>} />
          <Route path="/edit/:id" element={<EditPD/>} />
          <Route path="/manage-ac" element={<ManageAc/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
