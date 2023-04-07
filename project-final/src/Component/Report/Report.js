import { Button } from "evergreen-ui";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfDocument from "./PdfDocument ";

function Report() {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.post("http://localhost:4444/product", {
  //       main_aid: 1,
  //     });
  //     setData(result.data);
  //   };
  //   fetchData();
  // }, []);
  return (
    <PdfDocument  />
  );
}

export default Report;
