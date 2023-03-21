import React, { useEffect, useState } from "react";
import "./Chart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const [lb, setLb] = useState([]);
  const labels = [
    "งานเลขาณุการ",
    "งานทะเบียนและประมวลผล",
    "งานหลักสูตรและแผนการเรียน",
    "งานเทคโนโลยีสารสนเทศ",
    "ศูนย์พิจิตร",
  ];
  const options = {
    responsive: true,
    maintainAspecRadio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "ครุภัณฑ์แยกตามหน่วยงาน",
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  useEffect(() => {
    axios.get("http://localhost:4444/pstatus").then((res)=>{
      console.log(res.data)
    })
  },[]);
  const data = {
    labels,
    datasets: [
      {
        label: 'ใช้งานปกติ',
        data: [20, 15, 35, 60, 12],
        backgroundColor: "#c1fba4",
        borderWidth:2,
        borderColor: '#8cd867',

      },
      {
        label:  "ชำรุด(รอซ่อมบำรุง)",
        data: [4, 16, 37, 81, 15],
        backgroundColor: "#fff2b2",
        borderWidth:2,
        borderColor: '#ffd000',

      },
      {
        label:  "บริจาค",
        data: [15, 16, 3, 5, 14],
        backgroundColor: "#bde0fe",
        borderWidth:2,
        borderColor: '#4895ef',
      },
      {
        label: "เสื่อมคุณภาพ(ไม่จำเป็นต้องใช้ในราชการ)",
        data: [6, 4, 7, 8, 15],
        backgroundColor: "#ff7477",
        borderWidth:2,
        borderColor: '#dd2d4a',
      },
      {
        label: "จำหน่ายออกจากบัญชี",
        data: [12, 13, 4, 18, 19],
        backgroundColor: "#e0aaff",
        borderWidth:2,
        borderColor: '#c77dff',
      },
    ],
  };
  return <Bar options={options} data={data} className="chartBar" />;
}

export default BarChart;
