import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SelectField, TextInputField, Button } from "evergreen-ui";
import axios from "axios";
function AddPD() {
  const [valueType, setValueType] = useState([]);
  const [ptype, setPtype] = useState("1");
  const [valueAgen, setValueAgen] = useState([]);
  const [subagen, setSubAgen] = useState("1");
  const [valuePstatus, setValuePstatus] = useState([]);
  const [pstatus, setPstatus] = useState("1");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  useEffect(() => {
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
  },[]);
  const [images, setImages] = useState([]);
  const [file, setFile] = useState();
  const [typename, setTypeName] = useState("");
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setImages([...e.target.files]);
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
    setTypeName("." + e.target.files[0].type.split("image/")[1]);
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const onSubmit = (event) => {
    // event.preventDefault();
    console.table(event)
    console.table(event.pid + typename)
    // Your code to handle the file upload goes here
    axios.post("http://localhost:4444/add-product",{
      pid:"",
      pname:'',
      pdetail:'',
      qty:'',
      unit:'',
      price:'',
      finance:'',
      ac:'',
      ptype_id:'',
      seller:'',
      sub_aid:'',
      pstatus_id:'',
      buydate:'',
      pickdate:'',
      fisicalyear:'',
      image:''
    }).then((res)=>{
      
    })
  };
  return (
    <>
      <div className="container">
        <form   onSubmit={handleSubmit(onSubmit)}  className="d-flex flex-column">
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
                label="ผู้ขาย"
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
            <div className="col-6">
              <TextInputField
                inputHeight={40}
                label="วันเดือนปีที่ซื้อ"
                placeholder="วว/ดด/ปปปป"
                {...register("buydate", {
                  required: {
                    value: true,
                    message: "กรุณากรอกข้อมูล",
                  },
                  pattern: {
                    value:
                      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
                    message: "กรุณาป้อนข้อมูลให้ถูกต้อง",
                  },
                })}
                isInvalid={!!errors.buydate}
                validationMessage={
                  errors?.buydate ? errors.buydate.message : null
                }
              />
            </div>
            <div className="col-6">
              <TextInputField
                inputHeight={40}
                label="วันเดือนปีที่รับ"
                placeholder="วว/ดด/ปปปป"
                {...register("pickdate", {
                  required: {
                    value: true,
                    message: "กรุณากรอกข้อมูล",
                  },
                  pattern: {
                    value:
                      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
                    message: "กรุณาป้อนข้อมูลให้ถูกต้อง",
                  },
                })}
                isInvalid={!!errors.pickdate}
                validationMessage={
                  errors?.pickdate ? errors.pickdate.message : null
                }
              />
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
                inputHeight={40}
                type="file"
                onChange={handleFileInputChange}
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
          <div className="d-flex flex-row justify-content-end pb-3">
            <Button appearance="primary" intent="success" type="submit">
              บันทึก
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPD;
