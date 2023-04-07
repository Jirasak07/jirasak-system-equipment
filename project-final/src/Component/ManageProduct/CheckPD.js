import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, SelectField, TextInputField } from "evergreen-ui";
import axios from "axios";
import { format, addYears } from "date-fns";
import { th } from "date-fns/locale";
import Swal from "sweetalert2";

function CheckPD() {
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0]);
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const date = new Date();
  const month = new Date(date).getMonth() + 1;
  const currentYear = new Date(date).getFullYear();
  const [fisiyear, setFisiYear] = useState();
  const [pstatus, setPstatus] = useState(1);
  const [said, setSaid] = useState(1);
  const [dataPstatus, setDataPstatus] = useState([]);
  const [dataSaid, setDataSaid] = useState([]);
  const [updateDate, setUpdateDate] = useState();
  const [updateSub, setUpdateSub] = useState();
  const [updatePstatus, setUpdatePstatus] = useState();
  const [updateUser, setUpdateUser] = useState();
  const [updateDetail, setUpdateDetail] = useState();
  const [disable, setDisable] = useState(true);
  const [imgupdate, setImgUpdate] = useState();
  const main_aid = localStorage.getItem("main_aid");
  // const [upsaid,setUpsaid] = useState()
  // const [uppstatus,setUppstatus] = useState()
  useEffect(() => {
    console.log("file"+file)
    axios.get("http://localhost:4444/pstatus").then((res) => {
      setDataPstatus(res.data);
    });
    axios
      .post("http://localhost:4444/subagen", {
        main_aid: main_aid,
      })
      .then((res) => {
        setDataSaid(res.data);
      });
    if (month >= 10) {
      setFisiYear(currentYear + 544);
    } else {
      setFisiYear(currentYear + 543);
    }
    axios
      .post("http://localhost:4444/lastupdate", {
        pid: id,
      })
      .then((res) => {
        const data = res.data[0];
        console.log("BEE", data);
        const newDate = new Date(data.update_date);
        const year_ymd = addYears(newDate, 543);
        setUpdateDate(
          format(newDate, "dd/MM") + format(year_ymd, "'/'yyyy", { locale: th })
        );
        setUpdateSub(data.sub_aname);
        setUpdateUser(data.name);
        setUpdatePstatus(data.pstatus_name);
        setUpdateDetail(data.update_detail);
        setImgUpdate(data.imgupdate);
      });
    axios
      .post("http://localhost:4444/check-detail", {
        pid: id,
      })
      .then((res) => {
        console.log(res.data);
        setPstatus(res.data[0].pstatus_id);
        setSaid(res.data[0].sub_aid);
      });
  }, []);
  const changeStatus = (e) => {
    setPstatus(e.target.value);
    if ( e.target.value == 5 || e.target.value == 3) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };
  const onSubmit = async () => {
    const userid = localStorage.getItem("user_id");
    if ((file == null && pstatus == 5) ||( file == null && pstatus == 3)) {
      Swal.fire({
        icon: "error",
        title: "กรุณาแนบหลักฐาน",
      });
    } else {
      axios
        .post("http://localhost:4444/save-check", {
          pid: id,
          sub_aid: said,
          user_id: userid,
          check_year: fisiyear,
          pstatus_id: pstatus,
          evidence: "-",
        })
        .then(async (res) => {
          const status = res.data.status;
          if (status === "success") {
            Swal.fire({
              icon: "success",
              title: "เพิ่มการตรวจสอบเสร็จสิ้น",
              timer: 1500,
              showConfirmButton: false,
            }).then(async (val) => {
              if (pstatus == 5 || pstatus == 3) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("pid", id);
                await axios.post("http://localhost:4444/upload-file", formData);
              }
              axios.post("http://localhost:4444/save-update", {
                pid: id,
                sub_aid: said,
                user_id: userid,
                update_date: new Date(),
                pstatus_id: pstatus,
                imageupdate: imgupdate,
                update_detail: updateDetail,
              });
              navigate("/product");
            });
          } else if (status === "error") {
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถเพิ่มการตรวจสอบได้",
            });
          }
        });
    }
  };
  const onSubmitOld = () => {
    // axios.post("http://localhost:4444/save-check",{
    //   pid:id,
    //   sub_aid:,
    //   user_id:'',
    //   check_year:'',
    //   pstatus_id:'',
    //   evidence:''
    // })
  };
  return (
    <div className="pt-4 container ">
      <div className="d-flex flex-column" style={{ fontSize: 16 }}>
        <div
          className="justify-content-center d-flex"
          style={{ fontSize: 18, fontWeight: "bolder", gap: 5 }}
        >
          การตรวจสอบครุภัณฑ์หมายเลข <div>{id}</div>
        </div>
        <div
          className="rounded p-4 d-flex flex-column flex-lg-row"
          style={{ gap: 10 }}
        >
          <div
            className="bg-white p-4 col shadow-sm d-flex flex-column pb-5"
            style={{ borderRadius: 10 }}
          >
            <div
              className="d-flex flex-row align-items-center  "
              style={{ gap: 5, height: "40px" }}
            >
              <div
                className="px-2 py-1  "
                style={{
                  borderRadius: 10,
                  fontWeight: "bolder",
                  backgroundColor: "#caf0f8",
                  color: "#0096c7",
                }}
              >
                ข้อมูลอัพเดทล่าสุด
              </div>
              <div style={{ color: "#6c757d" }}> {updateDate} </div>
            </div>
            <div
              className="d-flex flex-row align-items-center"
              style={{ height: "55px" }}
            >
              <div>หน่วยงานที่ติดตั้ง : {updateSub}</div>
            </div>
            <div
              className="d-flex flex-row align-items-center"
              style={{ height: "55px" }}
            >
              สถานะ : {updatePstatus}
            </div>
            <div
              className="d-flex flex-row align-items-center"
              style={{ height: "55px" }}
            >
              ผู้ตรวจ : {updateUser}
            </div>
            <div
              className="d-flex flex-row justify-content-center"
              style={{
                position: "absolute",
                bottom: "20px",
                width: "100%",
                right: "0px",
              }}
            >
              <Button
                style={{
                  fontFamily: "'Kanit', sans-serif",
                  fontSize: 14,
                  fontWeight: "bolder",
                }}
                appearance="primary"
                intent="success"
                className="mt-4"
              >
                บักทึกการตวจสอบตามข้อมูล
              </Button>
            </div>
          </div>
          <div
            className="bg-white p-4 pb-5 col shadow-sm"
            style={{ borderRadius: 10 }}
          >
            <div className="d-flex flex-column ">
              <TextInputField
                label="ปีงบประมาณที่ตรวจ"
                height="50px"
                width="100%"
                maxLength={4}
                minLength={4}
                style={{ fontFamily: "'Kanit', sans-serif" }}
                defaultValue={fisiyear}
                value={fisiyear}
                onChange={(e) => setFisiYear(e.target.value)}
              />
              <SelectField
                label="หน่วยงานที่ติดตั้ง"
                height="50px"
                style={{ fontFamily: "'Kanit', sans-serif" }}
                value={said}
                onChange={(e) => setSaid(e.target.value)}
              >
                {dataSaid.map((item, index) => (
                  <option key={index} value={item.sub_aid}>
                    {item.sub_aname}
                  </option>
                ))}
              </SelectField>
              <SelectField
                label="สถานะ"
                height="50px"
                style={{ fontFamily: "'Kanit', sans-serif" }}
                value={pstatus}
                onChange={changeStatus}
              >
                {dataPstatus.map((item, index) => (
                  <option key={index} value={item.pstatus_id}>
                    {item.pstatus_name}
                  </option>
                ))}
              </SelectField>
              <TextInputField
                disabled={disable}
                required={!disable}
                type="file"
                label="เอกสารหลักฐาน"
                onChange={handleFileChange}
                style={{ fontFamily: "'Kanit', sans-serif" }}
              />
              <div
                className="d-flex flex-row justify-content-center"
                style={{
                  position: "absolute",
                  bottom: "20px",
                  width: "100%",
                  right: "0px",
                }}
              >
                <Button
                  style={{
                    fontFamily: "'Kanit', sans-serif",
                    fontSize: 14,
                    fontWeight: "bolder",
                  }}
                  appearance="primary"
                  intent="primary"
                  className="mt-2"
                  onClick={onSubmit}
                >
                  บันทึกข้อมูลตรวจสอบใหม่
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckPD;
