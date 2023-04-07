import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Dialog, TextInputField } from "evergreen-ui";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ManageAgen() {
  const [dataSubAgen, setDataSubAgen] = useState([]);
  const main_aid = localStorage.getItem("main_aid");
  const [isShown, setIsShown] = useState(false);
  const [subName, setSubName] = useState("");
  const [main_aname, setMain_aname] = useState();
  const [maxidsub, setMaxidsub] = useState(1);
  const navigate = useNavigate();
  const openDialog = () => {
    axios
      .post("http://localhost:4444/mainname", {
        main_aid: main_aid,
      })
      .then((res) => {
        setMain_aname(res.data[0].main_aname);
      });
    setIsShown(!isShown);
  };
  useEffect(() => {
    axios.get("http://localhost:4444/maxidsub").then((res) => {
      if (res.data[0].maxid == "null" || res.data[0].maxid == 0) {
        setMaxidsub(1);
      } else if (res.data[0].maxid > 0) {
        setMaxidsub(res.data[0].maxid + 1);
      }
    });
    axios
      .post("http://localhost:4444/subagen", {
        main_aid: main_aid,
      })
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        setDataSubAgen({
          columns: [
            {
              field: "no",
              label: "ลำดับ",
            },
            {
              field: "subaname",
              label: "ชื่อหน่วยงานย่อย",
            },
            {
              field: "main_aname",
              label: "หน่วยงานหลัก",
            },
          ],
          rows: [
            ...data.map((item, index) => ({
              no: <>{index + 1}</>,
              subaname: <> {item.sub_aname} </>,
              main_aname: <>{item.main_aname}</>,
            })),
          ],
        });
      });
    return () => {};
  }, []);
  const onSubmit = () => {
    if (subName == "") {
      Swal.fire({
        icon: "error",
        text: "กรุณากรอกข้อมูล",
      });
    } else {
      axios
        .post("http://localhost:4444/add-sub", {
          sub_aid: maxidsub,
          sub_aname: subName,
          main_aid: main_aid,
        })
        .then((res) => {
          if (res.data.status == "err") {
            Swal.fire({
              icon: "error",
              text: "เกิดข้อผิดพลาด",
            });
          } else if (res.data.status == "ok") {
            Swal.fire({
              icon: "success",
              text: "เพิ่มหน่วยงานเรียบร้อย",
              timer: 2000,
            }).then((res) => {
              window.location.reload();
            });
          }
        });
    }
  };
  return (
    <div className="container pt-3">
      <div className="py-2 d-flex flex-row align-items-center justify-content-between ">
        <div>ตารางแสดงหน่วยงานทั้งหมด</div>
        <div>
          <Button appearance="primary" intent="primary" onClick={openDialog}>
            เพิ่มหน่วยงานย่อย
          </Button>{" "}
        </div>
      </div>
      <div className="bg-white p-3 card ">
        <div className="mt-2 p-2">
          <MDBDataTable data={dataSubAgen} />
        </div>
      </div>
      <Dialog
        className="dialog"
        shouldCloseOnOverlayClick={false}
        isShown={isShown}
        onCloseComplete={() => setIsShown(false)}
        hasFooter={false}
      >
        <div>
          <TextInputField
            readOnly
            value={main_aname}
            label="หน่วยงานหลักที่ประจำ"
          />
          <TextInputField
            value={subName}
            onChange={(e) => setSubName(e.target.value)}
            placeholder="กรอกชื่อหน่วยงาน"
            label="ชื่อหน่วยงาน"
          />
        </div>
        <div>
          <Button
            onClick={onSubmit}
            width="100%"
            appearance="primary"
            intent="success"
          >
            บันทึก
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

export default ManageAgen;
