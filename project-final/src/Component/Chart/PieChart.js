import React, { useEffect, useState } from "react";
import "./Chart.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { format, addYears } from "date-fns";
import { th } from "date-fns/locale";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);
function PieChart() {
  const [fisiyear, setFisiYear] = useState(0);
  const date = new Date();
  const month = new Date(date).getMonth() + 1;
  const currentYear = new Date(date).getFullYear();
  const [nm, setNm] = useState();
  const [dn, setDn] = useState();
  const [brk, setBrk] = useState();
  const [ql, setQl] = useState();
  const [sold, setSold] = useState();
  const data = {
    labels: [
      "ใช้งานปกติ",
      "ชำรุด",
      "บริจาค",
      "เสื่อมคุณภาพ",
      "จำหน่ายออกจากบัญชี",
    ],
    datasets: [
      {
        label: "จำนวน",
        data: [nm, brk, dn, ql, sold],
        backgroundColor: [
          "#8cd867",
          "#ffd000",
          "#4895ef",
          "#dd2d4a",
          "#c77dff",
        ],
        borderWidth: 2,
        borderColor: ["white"],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "ครุภัณฑ์ทั้งหมดแยกตามสถานะ ประจำปีงบประมาณ"+fisiyear ,
      },
    },
  };
  useEffect(() => {
    if (month >= 10) {
      setFisiYear(currentYear + 544);
    } else {
      setFisiYear(currentYear + 543);
    }
    axios.post("http://localhost:4444/piechart-normal",{
      check_year:fisiyear
    }).then((res)=>{
      setNm(res.data)
    })
    axios.post("http://localhost:4444/piechart-broken",{
      check_year:fisiyear
    }).then((res)=>{
      setBrk(res.data)
    })
    axios.post("http://localhost:4444/piechart-donate",{
      check_year:fisiyear
    }).then((res)=>{
      setDn(res.data)
    })
    axios.post("http://localhost:4444/piechart-deteriorate",{
      check_year:fisiyear
    }).then((res)=>{
      setQl(res.data)
    })
    axios.post("http://localhost:4444/piechart-soldout",{
      check_year:fisiyear
    }).then((res)=>{
      setSold(res.data)
    })
    return () => {};
  });

  return <Pie data={data} options={options} style={{with:250,height:350}} />;
}

export default PieChart;
