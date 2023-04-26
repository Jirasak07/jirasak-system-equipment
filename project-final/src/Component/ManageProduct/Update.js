import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextInputField,
  TextareaField,
  SelectField,
  Button,
} from "evergreen-ui";
import axios from "axios";
import { format, addYears } from "date-fns";
import { th } from "date-fns/locale";
import Swal from "sweetalert2";
import noIMG from "../../assets/no-photo-available.png";

function Update() {
  const main = localStorage.getItem("main_aid")
  const [pstatus, setPstatus] = useState(1);
  const [said, setSaid] = useState(1);
  const [dataPstatus, setDataPstatus] = useState([]);
  const [dataSaid, setDataSaid] = useState([]);
  const [update_detail, setUpdateDetail] = useState("-");
  const [previewSource, setPreviewSource] = useState(null);
  const [max,setMax] = useState()
  const [img, setImg] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    axios.get("http://localhost:4444/pstatus-update").then((res) => {
      setDataPstatus(res.data);
    });
    axios
      .post("http://localhost:4444/subagen", {
        main_aid: main,
      })
      .then((res) => {
        setDataSaid(res.data);
      });
    return () => {};
  }, []);
  useEffect(()=>{
     axios.get("http://localhost:4444/maxupdate").then((res)=>{
        setMax(res.data[0].max)
    })
  })
  useEffect(() => {
    axios.post("http://localhost:4444/update-old",{
      pid:id
    }).then((res)=>{
      console.log("data Update :"+res.data)
        setSaid(res.data[0].sub_aid)
        setPstatus(res.data[0].pstatus_id)
        setUpdateDetail(res.data[0].update_detail)
        if (res.data[0].imgupdate) {
          setPreviewSource("http://localhost:4444/img/" + res.data[0].imgupdate);
        } else {
          setPreviewSource(noIMG);
        }
    })
    return () => {
      console.log("OUT")
    };
  }, [])
  const onSaveUpdate = () => {
    const newDate = new Date();
    axios
      .post("http://localhost:4444/save-update", {
        pid: id,
        sub_aid: said,
        user_id: user_id,
        pstatus_id: pstatus,
        imageupdate: max+id+typename,
        update_detail: update_detail,
      })
      .then((res) => {
        const url = "http://localhost:4444/upload";
        const formData = new FormData();
        formData.append("photo", file, max+id+ typename);
        axios.post(url, formData).then((response) => {});
        if (res.data.status == "success") {
          Swal.fire({
            icon: "success",
            text: "อัพเดทข้อมูลเสร็จสิ้น",
            timer: 2000,
          }).then((res) => {
            navigate("/product");
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "เพิ่มการอัพเดทไม่สำเร็จ",
          });
        }
      });
  };

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
    previewFile(filess);
  };
  const previewFile = (fil) => {
    const reader = new FileReader();
    reader.readAsDataURL(fil);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  useEffect(() => {

    return () => {
      console.log("out update page")
    };
  }, [])
  return (
    <>
      <div className="container pt-4 d-flex flex-row justify-content-center ">
        <div
          className="bg-white card p-4 w-100"
          style={{ minWidth: 375, maxWidth: 700 }}
        >
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div
              className="p-2"
              style={{
                backgroundColor: "#caf0f8",
                width: "fit-content",
                borderRadius: 10,
                color: "#0077b6",
                fontWeight: 500,
                fontSize: 18,
              }}
            >
              อัพเดทข้อมูลครุภัณฑ์หมายเลข {id}
            </div>
            <div className="d-flex flex-column">
              {previewSource && (
                <img
                  src={previewSource}
                  alt="Preview"
                  className="img-fluid mb-3 mt-3"
                  style={{ maxHeight: "190px" }}
                />
              )}
              <TextInputField
                type="file"
                onChange={onImageChange}
                name="photo"
              />
              <SelectField
                label="หน่วยงานที่ติดตั้ง"
                value={said}
                onChange={(e) => setSaid(e.target.value)}
              >
                {dataSaid.map((it, index) => (
                  <option key={index} value={it.sub_aid}>
                    {it.sub_aname}
                  </option>
                ))}
              </SelectField>
              <SelectField
                value={pstatus}
                onChange={(e) => setPstatus(e.target.value)}
                label="สถานะครุภัณฑ์"
              >
                {dataPstatus.map((it, index) => (
                  <option key={index} value={it.pstatus_id}>
                    {it.pstatus_name}{" "}
                  </option>
                ))}
              </SelectField>
              <TextareaField
                label="รายละเอียดที่อยู่"
                required
                lineHeight={0}
                value={update_detail}
                onChange={(e) => setUpdateDetail(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={onSaveUpdate} appearance="primary" intent="success">
                บันทึกการอัพเดท
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Update;
