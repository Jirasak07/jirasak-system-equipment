import axios from "axios";
import React, { useEffect, useState } from "react";
import QRCode from "../QRCode/QRCode";
import { format, addYears } from "date-fns";
import { th } from "date-fns/locale";
import { NavLink, useParams } from "react-router-dom";
import noIMG from "../../assets/no-photo-available.png";
import "./PDStyle.css";
import { Button } from "evergreen-ui";

function DetailProduct({ id }) {
  const [data, setData] = useState();
  const [pid, setPid] = useState();
  const [pname, setPname] = useState();
  const [detail, setDetail] = useState();
  const [qty, setQty] = useState();
  const [finance, setFinance] = useState();
  const [price, setPrice] = useState();
  const [ac, setAc] = useState();
  const [seller, setSeller] = useState();
  const [sname, setSname] = useState();
  const [buydate, setBuydate] = useState();
  const [pickdate, setPickdate] = useState();
  const [fisicalyear, setFisicalyear] = useState();
  const [status, setStatus] = useState();
  const [textStatus, setTextStatus] = useState("");
  const [ptype, setPtype] = useState();
  const [imga, setImg] = useState();
  const [imgupdate, ImgUpdate] = useState();
  const [subUpdate, setSubUpdate] = useState();
  const [statusUpdate, setStatusUpdate] = useState();
  const [dateUpdate, setDateUpdate] = useState();
  const [updateDetail, setUpdateDetail] = useState();
  const [evd, setEvd] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:4444/yearsmall", {
        pid: id,
      })
      .then((res) => {
        const data = res.data[0];
        setFisicalyear(data.check_year);
      });
    axios
      .post("http://localhost:4444/detail-pd", {
        pid: id,
      })
      .then((res) => {
        const datat = res.data[0];
        console.table(datat);
        setData(datat);
        setPid(datat.pid);
        setPname(datat.pname);
        setDetail(datat.pdetail);
        setQty(datat.qty + " " + datat.unit);
        setFinance(datat.finance);
        setPrice(datat.price);
        setAc(datat.acquirement);
        setSeller(datat.seller);
        setBuydate(format(new Date(datat.buydate), "P", { locale: th }));
        setPickdate(format(new Date(datat.pickdate), "P", { locale: th }));
        setPtype(datat.ptype_name);
        if (datat.image.length) {
          setImg("http://localhost:4444/img/" + datat.image);
        } else {
          setImg(noIMG);
        }
      });
    axios
      .post("http://localhost:4444/detail-pd-checklast", {
        pid: id,
      })
      .then((res) => {
        console.log(res.data);
        const datat = res.data[0];
        setSname(datat.sub_aname);

        setStatus(datat.pstatus_name);
      });
    axios
      .post("http://localhost:4444/lastupdate", {
        pid: id,
      })
      .then((res) => {
        const data = res.data[0];
        setSubUpdate(data.sub_aname);
        setStatusUpdate(data.pstatus_name);
        const newDate = new Date(data.update_date);
        const year_ymd = addYears(newDate, 543);
        setDateUpdate(
          format(newDate, "dd/MM") + format(year_ymd, "'/'yyyy", { locale: th })
        );
        setUpdateDetail(data.update_detail);
        ImgUpdate("http://localhost:4444/img/" + data.imgupdate);
        console.log(data.imgupdate)
      });
  }, [id]);
  const [filenames, setFileNames] = useState(null);
  useEffect(() => {
    axios
      .post("http://localhost:4444/find-check", {
        pid: id,
      })
      .then((res) => {
        const data = res.data[0];
        if (res.data.status === "nodata") {
          setEvd(true);
        } else {
          if (data.evidence === "-") {
            setEvd(true);
          } else {
            setFileNames(data.evidence);
            setSname(data.sub_aname);
          }
        }
      });
  }, []);
  const handleDownload = async () => {
    const response = await axios.get(
      `http://localhost:4444/download/${filenames}`,
      {
        responseType: "blob",
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filenames);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div
      className=" py-2 d-flex flex-column"
      style={{ borderRadius: 15, gap: 10 }}
    >
      <div
        className="py-3 px-2 d-flex flex-column shadow-md rounded"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="d-flex flex-row">
          <div className="col-4 d-flex justify-content-center ">
            <img src={imga} width={150} height={150} />
          </div>
          <div
            className="col-8 pb-2 pl-3 d-flex flex-column"
            style={{ fontSize: "100%", gap: 5, color: "#495057" }}
          >
            <div style={{ fontWeight: "bold", color: "#fb5607" }}> {pid}</div>
            <div style={{ color: "#e76f51" }}>{pname}</div>
            <div style={{ fontSize: 14 }}>... {detail}</div>
            <div className="d-flex " style={{ fontSize: "small", gap: 5 }}>
              {" "}
              <div style={{ fontWeight: "bolder" }}> ประเภท : </div> {ptype}
            </div>
          </div>
        </div>
        <div
          className="d-flex flex-row mt-2 px-3 justify-content-between "
          style={{ gap: 5, fontSize: 14 }}
        >
          <div>จำนวน : {qty} </div>
          <div>ประเภทเงิน : {finance}</div>
          <div>ราคา : {price} บาท</div>
        </div>
        <div
          style={{ fontSize: "small" }}
          className="d-flex flex-row mt-2 px-3 justify-content-between "
        >
          <div>ที่มาครุภัณฑ์ : {ac}</div>
          <div>ผู้ขาย : {seller}</div>
        </div>
        <div
          className="d-flex flex-row mt-2 px-3 justify-content-between "
          style={{ fontSize: "small", gap: 5 }}
        >
          <div>วันเดือนปีที่ซื้อ: {buydate} </div>
          <div>วันเดือนปีที่รับ: {pickdate}</div>
          <div>ครุภัณฑ์ปี : {fisicalyear}</div>
        </div>
        <div
          style={{ fontSize: "small" }}
          className="px-3 mt-2 d-flex flex-column justify-content-between"
        >
          <div> หน่วยงานที่รับผิดชอบ: {sname}</div>
          <div className="d-flex flex-row" style={{ gap: 5 }}>
            สถานะ : <div className={textStatus}>{status} </div>{" "}
            <div>
              <Button
                disabled={evd}
                appearance="minimal"
                intent="success"
                onClick={handleDownload}
              >
                เอกสารอ้างอิง
              </Button>
            </div>{" "}
          </div>
        </div>
      </div>

      <div
        className="bg-white p-4 shadow-md rounded d-flex flex-column align-items-center "
        style={{ fontSize: "small" }}
      >
        <div className="p-3">ข้อมูลอัพเดท : {dateUpdate}</div>
        <div>
          <img src={imgupdate} width={350} height={250} />
        </div>
        <div className="d-flex flex-column justify-content-start">
          <div className="mt-2">หน่วยงานที่ประจำ : {subUpdate}</div>
          <div className="mt-2">สถานะ : {statusUpdate}</div>
          <div className="mt-2">ที่อยู่ปัจจุบัน : {updateDetail}</div>
        </div>
      </div>
      <div className="bg-white p-4 shadow-md rounded">
        <QRCode id={id} />
      </div>
      <div className="d-flex flex-row justify-content-around">
        <NavLink className="btn col btn-warning" to={`/edit/${id}`}>
          แก้ไข
        </NavLink>
        <NavLink
          className="btn col-5 btn-secondary"
          to={`/product/check/${id}`}
        >
          เพิ่มการตรวจสอบ
        </NavLink>
        <NavLink className="btn col-4 btn-info" to={`/product/update/${id}`}>
          เพิ่มการอัพเดท
        </NavLink>
      </div>
    </div>
  );
}

export default DetailProduct;
