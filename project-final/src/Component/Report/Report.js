import { Button } from "evergreen-ui";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfDocument from "./PdfDocument ";

function Report() {
  return (
    <div className="p-3 ">
      <div
        className="bg-white p-3 "
        style={{
          borderRadius: 10,
          maxWidth: 1400,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div className="text-center">รายงานการตรวจสอบครุภัณฑ์</div>
        <div
          className="bg-info d-flex  flex-md-row flex-column px-2 py-2"
          style={{ justifyContent: "space-evenly",gap:10 }}
        >
          <div className="bg-white py-4 rounded col">1</div>
          <div className="bg-white py-4 rounded col">1</div>
          <div className="bg-white py-4 rounded col">1</div>
        </div>
      </div>
    </div>
  );
}

export default Report;
