import axios from "axios";
import React, { useEffect, useState } from "react";
import QRCode from "../QRCode/QRCode";
import { format } from "date-fns";
import { th } from "date-fns/locale";

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

  useEffect(() => {
    axios
      .post("http://localhost:4444/detail-pd", {
        pid: id,
      })
      .then((res) => {
        const datat = res.data[0];
        // console.table(datat);
        setData(datat);
        setPid(datat.pid);
        setPname(datat.pname);
        setDetail(datat.pdetail);
        setQty(datat.qty + " " + datat.unit);
        setFinance(datat.finance);
        setPrice(datat.price);
        setAc(datat.ac);
        setSeller(datat.seller);
        setSname(datat.sub_aname);
        setBuydate(format(new Date(datat.buydate), "P", { locale: th }));
        setPickdate(format(new Date(datat.pickdate), "P", { locale: th }));
        setFisicalyear(datat.fisicalyear);
        setStatus(datat.pstatus_name);
        setPtype(datat.ptype_name);
        if (datat.pstatus_id == 1) {
          setTextStatus("text-success");
        } else if (datat.pstatus_id == 2) {
          setTextStatus("text-warning");
        }
      });
  }, [id]);
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
            <img src="https://picsum.photos/150/150" width={150} height={150} />
          </div>
          <div
            className="col-8 pb-2 pl-3 d-flex flex-column"
            style={{ fontSize: "100%", gap: 5, color: "#495057" }}
          >
            <div style={{ fontWeight: "bold", color: "#fb5607" }}> {pid}</div>
            <div style={{ color: "#e76f51" }}>{pname}</div>
            <div style={{ fontSize: "small" }}>... {detail}</div>
            <div style={{ fontSize: "small" }}>ประเภท : {ptype}</div>
          </div>
        </div>
        <div
          className="d-flex flex-row mt-2 px-3 justify-content-between "
          style={{ gap: 5, fontSize: "small" }}
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
          <div> ผู้ขาย : {seller}</div>
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
          className="px-3 mt-2 d-flex flex-row justify-content-between"
        >
          <div> หน่วยงานที่รับผิดชอบ: {sname}</div>
          <div className="d-flex flex-row" style={{ gap: 5 }}>
            สถานะ : <div className={textStatus}>{status} </div>{" "}
          </div>
        </div>
      </div>

      <div
        className="bg-white p-4 shadow-md rounded d-flex flex-column align-items-center "
        style={{ fontSize: "small" }}
      >
        <div>
          <img src="https://picsum.photos/250/250" />
        </div>
        <div className="mt-2" >ที่อยู่ปัจจุบัน : sljdhfskjldvs</div>
      </div>
      <div className="bg-white p-4 shadow-md rounded">
        <QRCode id={id} />
      </div>
      <div className="btn btn-sm btn-warning shadow-md rounded">แก้ไข</div>
    </div>
  );
}

export default DetailProduct;
