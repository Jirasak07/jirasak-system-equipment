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
import { URL } from "../../config";
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
  const [agen1,setAgen1]= useState(0)
  const [agen2,setAgen2]= useState(0)
  const [agen3,setAgen3]= useState(0)
  const [agen4,setAgen4]= useState(0)
  const [agen5,setAgen5]= useState(0)
  var f = []
  var l = [2,5,3,5,4]
  useEffect(() => {
    console.log("use BarChart");
    axios
      .post(URL+"/barchart", {
        main_aid: main_aid,
      })
      .then((res) => {
        setDataArray(res.data);
      });
    axios
      .post(URL+"/countsub", {
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
     dataArray.forEach((item,index)=>{
      if(item.sub == 1){
        setAgen1(item.qty)
      }
      else if (item.sub == 2){
        setAgen2(item.qty)
      }
      else if (item.sub == 3){
        setAgen3(item.qty)
      }
      else if (item.sub == 4){
        setAgen4(item.qty)
      }
      else if (item.sub == 5){
        setAgen5(item.qty)
      }
      })  
  });
  
  
  const options = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: 'left',
        display:false,
      },
      title: {
        display: true,
        text: 'จำนวนครุภัณฑ์ใช้งานแยกตามหน่วยงาน',
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
      data: [agen1, agen2, agen3, agen4, agen5],
      backgroundColor: [
        '#3C486B',
        '#F9DBBB',
        '#F9D949',
        '#F45050',
        '#009FBD',
        '#210062',
        '#F5E9CF'
      ],
      borderWidth: 1,
    }]
  };
  return <Bar  data={data}  options={options} />;
}

export default BarChart;
