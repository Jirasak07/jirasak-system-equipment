import React from "react";
import './Chart.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ["ใช้งานปกติ", "ชำรุด", "บริจาค", "เสื่อมคุณภาพ", "จำหน่ายออกจากบัญชี",],
  datasets: [
    {
      label: "จำนวน",
      data: [12, 19, 3, 5, 2,],
      backgroundColor: [
        "#8cd867",
        "#ffd000",
        "#4895ef",
        "#dd2d4a",
        "#c77dff"
      ],
      borderWidth: 2,
      borderColor:[
       'white'
      ]
    },
  ],
};
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "ครุภัณฑ์ทั้งหมดแยกตามสถานะ",
    },
  },
};
function PieChart() {
  return <Pie data={data} options={options} className="pieBar" />;
}

export default PieChart;
