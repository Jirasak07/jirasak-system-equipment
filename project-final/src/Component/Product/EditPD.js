import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SelectField, TextInputField, Button } from "evergreen-ui";
import axios from "axios";
import { format } from "date-fns";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import noIMG from "../../assets/no-photo-available.png";
import Swal from "sweetalert2";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
function EditPD() {
  const { id } = useParams();
  const main_aid = localStorage.getItem("main_aid");
  const navigate = useNavigate();
  const [valueType, setValueType] = useState([]);
  const [ptype, setPtype] = useState(1);
  const [valueAgen, setValueAgen] = useState([]);
  const [subagen, setSubAgen] = useState(1);
  const [valuePstatus, setValuePstatus] = useState([]);
  const [pstatus, setPstatus] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [pname, setPname] = useState("");
  const [pdetail, setPdetail] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState();
  const [finance, setFinance] = useState();
  const [seller, setSeller] = useState();
  const [ac, setAc] = useState();
  const [fisicalyear, setFisicalyear] = useState();
  const [buydateOld, setBuydateOld] = useState();
  const [pickdateOld, setPickdateOld] = useState();
  const [buydate, setBuyDate] = useState(1);
  const [buymonth, setBuyMonth] = useState(1);
  const [pickdate, setPickDate] = useState(1);
  const [pickmonth, setPickMonth] = useState(1);
  const [buyd, setBuyD] = useState();
  const [buym, setBuyM] = useState();
  const [buyy, setBuyY] = useState();
  const date = [];
  const [ddate, setDdate] = useState([]);
  const [monthh, setMonthh] = useState([]);
  const [yearr, setYearr] = useState([]);
  const month = [
    { name: "มกราคม" },
    { name: "กุมภาพันธ์" },
    { name: "มีนาคม" },
    { name: "เมษายน" },
    { name: "พฤษภาคม" },
    { name: "มิถุนายน" },
    { name: "กรกฎาคม" },
    { name: "สิงหาคม" },
    { name: "กันยายน" },
    { name: "ตุลาคม" },
    { name: "พฤศจิกายน" },
    { name: "ธันวาคม" },
  ];
  const year = [];
  const thisyear = new Date().getUTCFullYear() + 543;
  const [buyyear, setBuyYear] = useState(thisyear);
  const [pickyear, setPickYear] = useState(thisyear);
  const [img, setImg] = useState();
  const [callImg, setCallImg] = useState();
  const [pid, setPid] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [images, setImages] = useState([]);
  const [file, setFile] = useState();
  const [typename, setTypeName] = useState("");
  const onImageChange = (e) => {
    setImages([...e.target.files]);
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
    // console.log("." + e.target.files[0].type.split("image/")[1]);
    setTypeName("." + e.target.files[0].type.split("image/")[1]);
    const filess = e.target.files[0];
    setCallImg(pid + "main" + "." + e.target.files[0].type.split("image/")[1]);
    previewFile(filess);
  };
  const previewFile = (fil) => {
    const reader = new FileReader();
    reader.readAsDataURL(fil);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const onSubmit = () => {
    const user_id = localStorage.getItem("user_id");
    var buy1 = buymonth + "/" + buydate + "/" + buyyear;
    const buydatee = format(new Date(buy1), "yyyy-MM-dd");
    var pick = pickmonth + "/" + pickdate + "/" + pickyear;
    const pickk = format(new Date(pick), "yyyy-MM-dd");
    axios
      .patch("http://localhost:4444/edit-product", {
        pname: pname,
        ptype_id: ptype,
        pdetail: pdetail,
        unit: unit,
        acquirement: ac,
        price: price,
        finance: finance,
        seller: seller,
        buydate: buydatee,
        pickdate: pickk,
        image: callImg,
        pid: id,
      })
      .then((res) => {
        if (res.data.status == "error") {
          Swal.fire({
            icon: "error",
            text: "เกิดข้อผิดพลาด",
          });
        } else if (res.data.status == "success") {
          if (file == null) {
            Swal.fire({
              icon: "success",
              text: "แก้ไขเสร็จสิ้น",
              timer: 3000,
              timerProgressBar: true,
            }).then((res) => {
              navigate("/product");
            });
          } else {
            const url = "http://localhost:4444/upload";
            const formData = new FormData();
            formData.append("photo", file, pid + "main" + typename);
            axios.post(url, formData).then((response) => {
              if (response.data.status === "success") {
                Swal.fire({
                  icon: "success",
                  text: "แก้ไขเสร็จสิ้น",
                  timer: 3000,
                  timerProgressBar: true,
                }).then((res) => {
                  navigate("/product");
                });
              } else {
                Swal.fire({
                  icon: "error",
                });
              }
            });
          }
        }
      });
  };
  useEffect(() => {
    console.log(file);
    axios
      .post("http://localhost:4444/detail-pd", {
        pid: id,
      })
      .then((res) => {
        const showBuy = String(
          format(new Date(res.data[0].buydate), "dd/M/yyyy")
        ).split("/");
        const showPick = String(
          format(new Date(res.data[0].pickdate), "dd/M/yyyy")
        ).split("/");
        console.table("This data", res.data);
        setPid(id);
        setPtype(res.data[0].ptype_id);
        setPstatus(res.data[0].pstatus_id);
        setSubAgen(res.data[0].sub_aid);
        setPname(res.data[0].pname);
        setPdetail(res.data[0].pdetail);
        setUnit(res.data[0].unit);
        setPrice(res.data[0].price);
        setFinance(res.data[0].finance);
        setSeller(res.data[0].seller);
        setAc(res.data[0].acquirement);
        setFisicalyear(res.data[0].fisicalyear);
        setBuydateOld(format(new Date(res.data[0].buydate), "dd/M/yyyy"));
        setPickdateOld(format(new Date(res.data[0].pickdate), "dd/M/yyyy"));
        setCallImg(res.data[0].image);
        setImg(res.data[0].image);
        if (res.data[0].image) {
          setPreviewSource("http://localhost:4444/img/" + res.data[0].image);
        } else {
          setPreviewSource(noIMG);
        }
        setPickDate(showPick[0]);
        setPickMonth(showPick[1]);
        setPickYear(showPick[2]);
        setBuyDate(showBuy[0]);
        setBuyMonth(showBuy[1]);
        setBuyYear(showBuy[2]);
      });
    axios.get("http://localhost:4444/product-type").then((res) => {
      setValueType(res.data);
    });
    axios
      .post("http://localhost:4444/subagen", {
        main_aid: main_aid,
      })
      .then((res) => {
        setValueAgen(res.data);
      });
    axios.get("http://localhost:4444/pstatus").then((res) => {
      setValuePstatus(res.data);
    });
  }, []);
  // useEffect(() => {
  //   const showBuy = String(buydateOld).split("/");
  //   const showPick = String(pickdateOld).split("/");
  //   setBuyD(showBuy[0]);
  //   setBuyM(showBuy[1]);
  //   setBuyY(showBuy[2]);
  //   setPickDate(showPick[0]);
  //   setPickMonth(showPick[1]);
  //   setPickYear(showPick[2]);
  //   console.log("vv");
  // });
  useEffect(() => {
    for (let i = 1; i <= 31; i++) {
      date.push({ date: i, datename: i.toString() });
    }
    for (let i = 0; i <= 40; i++) {
      year.push({ ind: i, yname: (thisyear - i).toString() });
    }
    setDdate(date);
    setMonthh(month);
    setYearr(year);

    setBuyDate(buyd);
    setBuyMonth(buym);
    setBuyYear(buyy);
  }, []);
  return (
    <>
      <div className="container-fluid px-3">
        <div>
          <Breadcrumbs aria-label="breadcrumb">
            <NavLink underline="hover" color="inherit" to="/dashboard">
              หน้าแรก
            </NavLink>
            <NavLink underline="hover" color="inherit" to="/product">
              แสดงครุภัณฑ์
            </NavLink>
            <Typography >แก้ไขครุภัณฑ์</Typography>
          </Breadcrumbs>
        </div>
        <div className="bg-white rounded p-2 mt-2">
          <div className="my-3 text-center">
            การแก้ไขข้อมูลครุภัณฑ์หมายเลข : {id}
          </div>
          <form className="d-flex flex-column">
            <div className="d-flex flex-row">
              <div className="col-6">
                <TextInputField
                  inputHeight={40}
                  label="หมายเลขครุภัณฑ์"
                  placeholder="KPRU..."
                  disabled
                  value={id}
                />
              </div>
              <div className="col-6">
                <TextInputField
                  inputHeight={40}
                  label="รายการ"
                  defaultValue={pname}
                  placeholder="ชื่อครุภัณฑ์"
                  required={true}
                  onChange={(e) => setPname(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex flex-row">
              <div className="col-6">
                <SelectField
                  label="ประเภทครุภัณฑ์"
                  inputHeight={40}
                  value={ptype}
                  onChange={(event) => setPtype(event.target.value)}
                >
                  {valueType.map((option, index) => (
                    <option key={index} value={option.ptype_id}>
                      {option.ptype_name}
                    </option>
                  ))}
                </SelectField>
              </div>
              <div className="col-6">
                <TextInputField
                  inputHeight={40}
                  label="คุณลักษณะ"
                  defaultValue={pdetail}
                  placeholder="รายละเอียดครุภัณฑ์"
                  onChange={(e) => setPdetail(e.target.value)}
                  required={true}
                />
              </div>
            </div>
            <div className="d-flex flex-row">
              <div className="col-3">
                <TextInputField
                  inputHeight={40}
                  label="จำนวน"
                  placeholder="1.."
                  type="number"
                  value={1}
                  required={true}
                />
              </div>
              <div className="col-3">
                <TextInputField
                  inputHeight={40}
                  label="หน่วย"
                  placeholder="เครื่อ.."
                  defaultValue={unit}
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required={true}
                />
              </div>
              <div className="col-6">
                <TextInputField
                  inputHeight={40}
                  label="ราคา (บาท)"
                  placeholder="1500.."
                  defaultValue={price}
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  required={true}
                />
              </div>
            </div>
            <div className="d-flex flex-row">
              <div className="col-6">
                <TextInputField
                  inputHeight={40}
                  value={finance}
                  label="ประเภทเงิน"
                  placeholder="งบประมา.."
                  defaultValue={finance}
                  onChange={(e) => setFinance(e.target.value)}
                  required={true}
                />
              </div>
              <div className="col-6">
                <TextInputField
                  inputHeight={40}
                  label="ผู้ขาย"
                  placeholder="บริษัท.."
                  value={seller}
                  onChange={(e) => setSeller(e.target.value)}
                  required={true}
                />
              </div>
            </div>
            <div className="d-flex flex-row">
              <div className="col-12">
                <TextInputField
                  inputHeight={40}
                  label="ที่มาครุภัณฑ์"
                  defaultValue={ac}
                  placeholder="ตกลงราค.."
                  onChange={(e) => setAc(e.target.value)}
                  required={true}
                />
              </div>
            </div>
            <div className="d-flex flex-column flex-lg-row">
              <div
                className="col-12 col-lg-6 d-flex flex-row"
                style={{ gap: 5 }}
              >
                <SelectField
                  value={buydate || ""}
                  onChange={(event) => setBuyDate(event.target.value)}
                  label="วัน"
                  inputHeight={40}
                >
                  {ddate.map((option, index) => (
                    <option key={index} value={option.date}>
                      {option.datename}
                    </option>
                  ))}
                </SelectField>
                <SelectField
                  value={buymonth || ""}
                  onChange={(event) => setBuyMonth(event.target.value)}
                  label="เดือน"
                  inputHeight={40}
                >
                  {monthh.map((option, index) => (
                    <option key={index} value={index + 1}>
                      {option.name}
                    </option>
                  ))}
                </SelectField>
                <SelectField
                  value={buyyear}
                  onChange={(e) => {
                    setBuyYear(e.target.value);
                  }}
                  label="ปีที่ซื้อ"
                  inputHeight={40}
                >
                  {yearr.map((option, index) => (
                    <option key={index} value={option.yname}>
                      {option.yname}
                    </option>
                  ))}
                </SelectField>
              </div>
              {/* /////////////////////////////////////////////////////////////// */}
              <div
                className="col-12 col-lg-6 d-flex flex-row"
                style={{ gap: 5 }}
              >
                <SelectField
                  value={pickdate}
                  onChange={(e) => {
                    setPickDate(e.target.value);
                  }}
                  label="วัน"
                  inputHeight={40}
                >
                  {ddate.map((option, index) => (
                    <option key={index} value={option.date}>
                      {option.datename}
                    </option>
                  ))}
                </SelectField>
                <SelectField
                  value={pickmonth}
                  onChange={(e) => {
                    setPickMonth(e.target.value);
                  }}
                  label="เดือน"
                  inputHeight={40}
                >
                  {monthh.map((option, index) => (
                    <option key={index} value={index + 1}>
                      {option.name}
                    </option>
                  ))}
                </SelectField>
                <SelectField
                  value={pickyear}
                  onChange={(e) => {
                    setPickYear(e.target.value);
                  }}
                  label="ปีที่รับ"
                  inputHeight={40}
                >
                  {yearr.map((option, index) => (
                    <option key={index} value={option.yname}>
                      {option.yname}
                    </option>
                  ))}
                </SelectField>
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="col-12 bg-white p-3">
                <TextInputField
                  type="file"
                  onChange={onImageChange}
                  name="photo"
                />
              </div>
              <div className="col-12 bg-white  p-3 d-flex flex-row justify-content-center ">
                {previewSource && (
                  <img
                    src={previewSource}
                    alt="Preview"
                    className="img-fluid mb-3"
                    style={{ maxHeight: "300px" }}
                  />
                )}
              </div>
            </div>
            <div
              className="d-grid"
              style={{ gap: 5 }}
            >
              <Button appearance="primary" width={"100%"} intent="success" onClick={onSubmit}>
                บันทึก
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditPD;
