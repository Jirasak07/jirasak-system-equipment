import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SelectField, TextInputField, Button } from "evergreen-ui";
import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function AddPD({ closeAdd }) {
  const [valueType, setValueType] = useState([]);
  const [ptype, setPtype] = useState(1);
  const [valueAgen, setValueAgen] = useState([]);
  const [subagen, setSubAgen] = useState(1);
  const [valuePstatus, setValuePstatus] = useState([]);
  const [pstatus, setPstatus] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const main_aid = localStorage.getItem("main_aid");
  useEffect(() => {
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
  const [images, setImages] = useState([]);
  const [file, setFile] = useState();
  const [typename, setTypeName] = useState("");
  const [buydate, setBuyDate] = useState(1);
  const [buymonth, setBuyMonth] = useState(1);
  const [pickdate, setPickDate] = useState(1);
  const [pickmonth, setPickMonth] = useState(1);

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
  const onImageChange = (e) => {
    setImages([...e.target.files]);
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
    // console.log("." + e.target.files[0].type.split("image/")[1]);
    setTypeName("." + e.target.files[0].type.split("image/")[1]);
    const filess = e.target.files[0];
    previewFile(filess);
  };
  const previewFile = (fil) => {
    const reader = new FileReader();
    reader.readAsDataURL(fil);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const onSubmit = (event) => {
    const user_id = localStorage.getItem("user_id");
    var buy1 = buymonth + "/" + buydate + "/" + buyyear;
    const buydatee = format(new Date(buy1), "yyyy-MM-dd");
    var pick = pickmonth+ "/" + pickdate + "/" + pickyear;
    const pickk = format(new Date(pick), "yyyy-MM-dd");
    axios
      .post("http://localhost:4444/add-product", {
        pid: event.pid,
        pname: event.pname,
        pdetail: event.pdetail,
        qty: 1,
        unit: event.unit,
        price: event.price,
        finance: event.finance,
        acquirement: event.ac,
        ptype_id: ptype,
        seller: event.seller,
        buydate: buydatee,
        pickdate: pickk,
        image: event.pid + "main" + typename,
      })
      .then((res) => {
        if (res.data.status === "success") {
          const url = "http://localhost:4444/upload";
          const formData = new FormData();
          formData.append("photo", file, event.pid + "main" + typename);
          axios.post(url, formData).then((response) => {
            if (response.data.status === "success") {
            }
          });
          axios
            .post("http://localhost:4444/save-check", {
              pid: event.pid,
              sub_aid: subagen,
              user_id: user_id,
              check_year: event.fisicalyear,
              pstatus_id: pstatus,
              evidence: "-",
            })
            .then((res) => {});
          axios
            .post("http://localhost:4444/save-update", {
              pid: event.pid,
              sub_aid: subagen,
              userid: user_id,
              pstatus_id: pstatus,
              imageupdate: event.pid + "main" + typename,
              update_detail: "fist add data",
            })
            .then((res) => {
              Swal.fire({
                icon: "success",
                text: "เพิ่มครุภัณฑ์หมายเลข" + event.pid + "เสร็จสิ้น",
                timer: 1500,
              }).then((val) => {
                navigate("/product");
                window.location.reload();
              });
            });
        } else if (res.data.status === "error") {
          Swal.fire({
            icon: "error",
            text: "มีครุภัณฑ์หมายเลข" + event.pid + "อยู่ในระบบแล้ว",
            timer: 2000,
          });
        }
      });
  };
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
  }, []);
  const mm = (e) => {
    setBuyMonth(e.target.value);
    console.log(e.target.value);
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
          <div className="d-flex flex-row">
            <div className="col-6">
              <TextInputField
                inputHeight={40}
                label="หมายเลขครุภัณฑ์"
                placeholder="KPRU..."
                {...register("pid", {
                  required: {
                    value: true,
                    message: "กรุณากรอกหมายเลขครุภัณฑ์",
                  },
                  pattern: {
                    value: /\w{6}-\d{2}\.\d{2}-\d{4}/,
                    message: "กรุณากรอกหมายเลขครุภัณฑ์ให้ถูกต้อง",
                  },
                  maxLength: {
                    value: 17,
                    message:
                      "กรุณากรอกหมายเลขครุภัณฑ์ให้ถูกต้อง (ไม่เกิน 17 ตัวอักษร)",
                  },
                })}
                isInvalid={!!errors.pid}
                validationMessage={errors?.pid ? errors.pid.message : null}
              />
            </div>
            <div className="col-6">
              <TextInputField
                inputHeight={40}
                label="รายการ"
                placeholder="ชื่อครุภัณฑ์"
                {...register("pname", {
                  required: {
                    value: true,
                    message: "กรุณากรอกชื่อครุภัณฑ์",
                  },
                })}
                isInvalid={!!errors.pname}
                validationMessage={errors?.pname ? errors.pname.message : null}
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
                placeholder="รายละเอียดครุภัณฑ์"
                {...register("pdetail", {
                  required: {
                    value: true,
                    message: "กรุณากรอกคุณลักษณะครุภัณฑ์",
                  },
                })}
                isInvalid={!!errors.pdetail}
                validationMessage={
                  errors?.pdetail ? errors.pdetail.message : null
                }
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
              />
            </div>
            <div className="col-3">
              <TextInputField
                inputHeight={40}
                label="หน่วย"
                placeholder="เครื่อ.."
                {...register("unit", {
                  required: {
                    value: true,
                    message: "กรุณากรอกหน่วยครุภัณฑ์",
                  },
                })}
                isInvalid={!!errors.unit}
                validationMessage={errors?.unit ? errors.unit.message : null}
              />
            </div>
            <div className="col-6">
              <TextInputField
                inputHeight={40}
                label="ราคา (บาท)"
                placeholder="1500.."
                type="number"
                {...register("price", {
                  required: {
                    value: true,
                    message: "กรุณากรอกราคา",
                  },
                  pattern: {
                    value: /^[1-9][0-9]*$/,
                    message: "กรุณากรอกราคาให้ถูกต้อง",
                  },
                })}
                isInvalid={!!errors.price}
                validationMessage={errors?.price ? errors.price.message : null}
              />
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="col-6">
              <TextInputField
                inputHeight={40}
                label="ประเภทเงิน"
                placeholder="งบประมา.."
                {...register("finance", {
                  required: {
                    value: true,
                    message: "กรุณากรอกประเภทเงิน",
                  },
                })}
                isInvalid={!!errors.finance}
                validationMessage={
                  errors?.finance ? errors.finance.message : null
                }
              />
            </div>
            <div className="col-6">
              <TextInputField
                inputHeight={40}
                label="ผู้ขาย "
                hint="ไม่มีให้ใส่ -"
                placeholder="บริษัท.."
                {...register("seller", {
                  required: {
                    value: true,
                    message: "กรุณากรอกราคาให้ถูกต้อง",
                  },
                })}
                isInvalid={!!errors.seller}
                validationMessage={
                  errors?.seller ? errors.seller.message : null
                }
              />
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="col-6">
              <TextInputField
                inputHeight={40}
                label="ที่มาครุภัณฑ์"
                hint="ไม่มีให้ใส่ -"
                placeholder="ตกลงราค.."
                {...register("ac", {
                  required: {
                    value: true,
                    message: "กรุณากรอกที่มาของครุภัณฑ์",
                  },
                })}
                isInvalid={!!errors.ac}
                validationMessage={errors?.ac ? errors.ac.message : null}
              />
            </div>
            <div className="col-6">
              <TextInputField
                inputHeight={40}
                label="ปีงบประมาณ"
                hint="ไม่มีให้ใส่ -"
                placeholder="2560.."
                {...register("fisicalyear", {
                  required: {
                    value: true,
                    message: "กรุณากรอกข้อมูล",
                  },
                  minLength: {
                    value: 4,
                    message: "กรอกได้ 4 ตัวเลข",
                  },
                  maxLength: {
                    value: 4,
                    message: "กรอกได้ 4 ตัวเลข",
                  },
                })}
                isInvalid={!!errors.fisicalyear}
                validationMessage={
                  errors?.fisicalyear ? errors.fisicalyear.message : null
                }
              />
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="col-6 d-flex flex-row" style={{ gap: 5 }}>
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
            <div className="col-6 d-flex flex-row" style={{ gap: 5 }}>
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
                  <option key={index} value={index+1}>
                    {option.name}
                  </option>
                ))}
              </SelectField>
              <SelectField
              value={pickyear}
              onChange={(e)=>{setPickYear(e.target.value)}}
              label="ปีที่รับ" inputHeight={40}>
                {yearr.map((option, index) => (
                  <option key={index} value={option.yname}>
                    {option.yname}
                  </option>
                ))}
              </SelectField>
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="col-6">
              <SelectField
                label="หน่วยงานที่ติดตั้ง"
                inputHeight={40}
                value={subagen}
                onChange={(event) => setSubAgen(event.target.value)}
              >
                {valueAgen.map((option, index) => (
                  <option key={index} value={option.sub_aid}>
                    {option.sub_aname}
                  </option>
                ))}
              </SelectField>
            </div>
            <div className="col-6">
              <SelectField
                label="สถานะครุภัณฑ์"
                inputHeight={40}
                value={pstatus}
                onChange={(event) => setPstatus(event.target.value)}
              >
                {valuePstatus.map((option, index) => (
                  <option key={index} value={option.pstatus_id}>
                    {option.pstatus_name}
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
            className="d-flex flex-row justify-content-end pb-3"
            style={{ gap: 5 }}
          >
            <Button appearance="primary" intent="success" type="submit">
              บันทึก
            </Button>
            <div className="btn-danger btn" onClick={test}>
              เทส
            </div>
            <Button
              appearance="primary"
              intent="danger"
              type="button"
              onClick={closeAdd}
            >
              ปิด
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPD;
