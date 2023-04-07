import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SelectField, TextInputField, Button } from "evergreen-ui";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import noIMG from "../../assets/no-photo-available.png";
import Swal from "sweetalert2";
function EditPD() {
  const { id } = useParams();
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
  const [buydate, setBuydate] = useState();
  const [pickdate, setPickdate] = useState();
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
  const onSubmit = (e) => {
    const user_id = localStorage.getItem("user_id");
    var day1 = String(buydate).split("/");
    var buy1 = day1[1] + "/" + day1[0] + "/" + day1[2];
    const buydatee = format(new Date(buy1), "yyyy-MM-dd");
    var day2 = String(pickdate).split("/");
    var pick = day2[1] + "/" + day2[0] + "/" + day2[2];
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
              timer: 2000,
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
                  timer: 2000,
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
        setBuydate(format(new Date(res.data[0].buydate), "P"));
        setPickdate(format(new Date(res.data[0].pickdate), "P"));
        setCallImg(res.data[0].image);
        setImg(res.data[0].image);
        if (res.data[0].image) {
          setPreviewSource("http://localhost:4444/img/" + res.data[0].image);
        } else {
          setPreviewSource(noIMG);
        }
      });
    axios.get("http://localhost:4444/product-type").then((res) => {
      console.log(res.data);
      setValueType(res.data);
    });
    axios.get("http://localhost:4444/subagen").then((res) => {
      setValueAgen(res.data);
    });
    axios.get("http://localhost:4444/pstatus").then((res) => {
      setValuePstatus(res.data);
    });
  }, []);
  return (
    <>
      <div className="container p-4 bg-white rounded mt-3">
        <div className="my-3 text-center">
          การแก้ไขข้อมูลครุภัณฑ์หมายเลข : {id}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
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
                defaultValue={unit}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
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
              />
            </div>
            <div className="col-6">
              <TextInputField
                inputHeight={40}
                label="ผู้ขาย"
                placeholder="บริษัท.."
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
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
              />
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="col-6">
              <TextInputField
                inputHeight={40}
                label="วันเดือนปีที่ซื้อ"
                defaultValue={buydate}
                placeholder="วว/ดด/ปปปป"
                value={buydate}
                onChange={(e) => setBuydate(e.target.value)}
              />
            </div>
            <div className="col-6">
              <TextInputField
                inputHeight={40}
                label="วันเดือนปีที่รับ"
                defaultValue={pickdate}
                placeholder="วว/ดด/ปปปป"
                value={pickdate}
                onChange={(e) => setPickdate(e.target.value)}
              />
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
          </div>
        </form>
      </div>
    </>
  );
}

export default EditPD;
