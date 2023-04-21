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
  const [fisiyear, setFisiYear] = useState(0);
  const date = new Date();
  const month = new Date(date).getMonth() + 1;
  const currentYear = new Date(date).getFullYear();
  const [lb, setLb] = useState([]);

  const main_aid = localStorage.getItem("main_aid");
  const [countsub, setCountSub] = useState();
  const [datas, setDatas] = useState();
  const [dataArray, setDataArray] = useState([]);
  var f = []
  var l = [2,5,3,5,4]
  useEffect(() => {
    console.log("use BarChart");
    axios
      .post("http://localhost:4444/barchart", {
        main_aid: main_aid,
      })
      .then((res) => {
        setDataArray(res.data);
      });
    axios
      .post("http://localhost:4444/countsub", {
        main_aid: main_aid,
      })
      .then((res) => {
        setCountSub(res.data[0].sub);
      });
    return () => {
      console.log("out Barchart");
    };
  }, []);
  useEffect(() => {
    for(let i=1;i<=countsub;i++){
      dataArray.forEach((item,index)=>{
        if(item.sub == 1){
          f.push(item.qty)
        }
     
      })
      console.log(f)
    }
  });
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'จำนวนครุภัณฑ์แยกตามหน่วยงาน',
      },
    },
  };
  const labels = [
    "งานเลขาณุการ",
    "งานทะเบียนและประมวลผล",
    "งานหลักสูตรและแผนการเรียน",
    "งานเทคโนโลยีสารสนเทศ",
    "ศูนย์พิจิตร",
  ];
  const data = {
    labels: labels,
    datasets: [{
      label:'',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        '#3C486B',
        '#F9DBBB',
        '#F9D949',
        '#F45050',
        '#009FBD',
        '#210062',
        '#F5E9CF'
      ],
      borderWidth: 1
    }]
  };
  return <Bar  data={data} className="chartBar" options={options} />;
}

export default BarChart;
