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
  const main_aid = localStorage.getItem("main_aid");
  const [countsub, setCountSub] = useState();
  const normal = [];
  const [datas, setDatas] = useState();
  useEffect(() => {
    console.log("use BarChart")
    axios
      .post("http://localhost:4444/countsub", {
        main_aid: main_aid,
      })
      .then((res) => {
        setCountSub(res.data[0].sub);
      });
    for (let i = 1; i <= countsub; i++) {
      axios
        .post("http://localhost:4444/barchart", {
          pstatus_id: 1,
          sub_aid: i,
        })
        .then((res) => {
          normal.push(res.data[0].data);
        });
      setDatas(normal);
    }
    return () => {
      console.log("out Barchart")
    };
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "ใช้งานปกติ",
        data: datas,
        backgroundColor: "#8cd867",
        borderWidth: 2,
        borderColor: "#8cd867",
      },
      {
        label: "ชำรุด(รอซ่อมบำรุง)",
        data: [4, 16, 37, 81, 15],
        backgroundColor: "#ffd000",
        borderWidth: 2,
        borderColor: "#ffd000",
      },
      {
        label: "บริจาค",
        data: [15, 16, 3, 5, 14],
        backgroundColor: "#4895ef",
        borderWidth: 2,
        borderColor: "#4895ef",
      },
      {
        label: "เสื่อมคุณภาพ(ไม่จำเป็นต้องใช้ในราชการ)",
        data: [6, 4, 7, 8, 15],
        backgroundColor: "#dd2d4a",
        borderWidth: 2,
        borderColor: "#dd2d4a",
      },
      {
        label: "จำหน่ายออกจากบัญชี",
        data: [12, 13, 4, 18, 19],
        backgroundColor: "#c77dff",
        borderWidth: 2,
        borderColor: "#c77dff",
      },
    ],
  };
  return <Bar options={options} data={data} className="chartBar" />;
}

export default BarChart;
