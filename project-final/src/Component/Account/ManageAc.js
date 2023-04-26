import React, { useEffect, useState } from "react";
import { Button, Dialog, SelectField, TextInputField } from "evergreen-ui";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import Swal from "sweetalert2";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink } from "react-router-dom";
function ManageAc() {
  const [isShownAdd, setIsShownAdd] = useState(false);
  const [isShownAddUser, setIsShownAddUser] = useState(false);
  const [users, setUsers] = useState([]);
  const main = localStorage.getItem("main_aid");
  const [userdt, setUserdt] = useState(null);
  const [name, setName] = useState(null);
  const [ustatus_id, setUstatus_id] = useState(null);
  const [ustatus, setUstatus] = useState([]);
  const [user_id, setUser_id] = useState(null);

  const [nameAd, setNameAd] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [maindata, setMainData] = useState([]);
  const [main_aid, setMain_aid] = useState(1);
  const [color, setColor] = useState("");
  const [maxuid, setMaxid] = useState();

  const changeUstatus = () => {
    axios
      .post("http://localhost:4444/change-status", {
        ustatus: ustatus_id,
        user_id: user_id,
      })
      .then((res) => {
        if (res.status === "err") {
          Swal.fire({
            icon: "error",
            text: "เกิดข้อผิดพลาด",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "แก้ไขสถานะผู้ใช้งานเสร็จเสิ้น",
            timer: 2000,
            showConfirmButton: false,
          }).then((res) => {
            window.location.reload();
          });
        }
      });
  };
  const onSubmitUser = () => {
    axios
      .post("http://localhost:4444/add-user", {
        maxid: maxuid,
        username: username,
        name: nameAd,
        password: password,
        main_aid: main_aid,
        ustatus_id: 1,
      })
      .then((res) => {
        if (res.data.status === "error") {
          Swal.fire({
            icon: "error",
            text: res.data.message,
          });
        } else if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            timer: 2500,
            showConfirmButton: false,
          }).then((res) => {
            window.location.reload();
          });
        }
      });
  };
  const openDialog = (val) => {
    axios
      .post("http://localhost:4444/user-detail", {
        user_id: val,
      })
      .then((res) => {
        setUserdt(res.data);
        setIsShownAdd(!isShownAdd);
        setName(res.data[0].name);
        setUstatus_id(res.data[0].ustatus_id);
        setUser_id(res.data[0].user_id);
      });
  };
  axios.get("http://localhost:4444/ustatus").then((res) => {
    setUstatus(res.data);
  });
  useEffect(() => {
    axios.get("http://localhost:4444/maxuserid").then((res) => {
      const maxid = res.data[0].maxid;
      if (maxid === "null" || maxid === 0) {
        setMaxid(1);
      } else if (maxid > 0) {
        setMaxid(maxid + 1);
      }
    });
    axios.get("http://localhost:4444/main-agen").then((res) => {
      setMainData(res.data);
    });
    axios
      .post("http://localhost:4444/show-user", {
        main_aid: main,
      })
      .then((res) => {
        const user = res.data;
        setUsers({
          columns: [
            {
              field: "no",
              label: "ลำดับ",
            },
            {
              field: "name",
              label: "ชื่อ",
            },
            {
              field: "username",
              label: "username",
            },
            {
              field: "main",
              label: "หน่วยงาน",
            },
            {
              field: "status",
              label: "สถานะ",
            },
            {
              field: "manage",
              label: "จัดการ",
            },
          ],
          rows: [
            ...user.map((item, index) => ({
              no: <> {index + 1}</>,
              name: `${item.name}`,
              username: `${item.username}`,
              main: `${item.main_aname}`,
              status: (
                <div
                  className={
                    item.ustatus_id == 1 ? "text-success" : "text-danger"
                  }
                >
                  {item.ustatus_name}
                </div>
              ),
              manage: (
                <Button
                  className="bg-warning border"
                  appearance="primary"
                  onClick={() => openDialog(item.user_id)}
                >
                  {" "}
                  แก้ไข{" "}
                </Button>
              ),
            })),
          ],
        });
      });
    return () => {};
  }, []);
  return (
    <div className="container-fluid ">
      <div>
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink underline="hover" color="inherit" to="/dashboard">
            Home
          </NavLink>
          <Typography color="text.primary">Manage User</Typography>
        </Breadcrumbs>
      </div>
      <div className="bg-white p-3 rounded mt-2">
        <div className="d-flex flex-row justify-content-between">
          <div>ตารางแสดงผู้ใช้งานในระบบ</div>
          <Button
            intent="primary"
            appearance="primary"
            onClick={() => setIsShownAddUser(!isShownAddUser)}
          >
            เพิ่มผู้ใช้งาน
          </Button>
        </div>

        <div className="p-3 mt-2  ">
          <MDBDataTable data={users} responsive />
        </div>
      </div>
      <Dialog
        className="dialog "
        shouldCloseOnOverlayClick={false}
        isShown={isShownAdd}
        onCloseComplete={() => setIsShownAdd(false)}
        hasFooter={false}
      >
        <div className="text-center">จัดการสถานะผู้ใช้</div>
        <div className="mt-3 d-flex flex-row align-items-center justify-content-around">
          <TextInputField label="ชื่อ" value={name} readOnly />
          <SelectField
            label="สถานะ"
            value={ustatus_id}
            onChange={(e) => setUstatus_id(e.target.value)}
          >
            {ustatus.map((item) => (
              <option value={item.ustatus_id}>{item.ustatus_name}</option>
            ))}
          </SelectField>
        </div>
        <div className="d-flex fle-row justify-content-end p-3 ">
          <Button
            onClick={changeUstatus}
            width="100%"
            appearance="primary"
            intent="success"
          >
            {" "}
            บันทึก{" "}
          </Button>
        </div>
      </Dialog>
      <Dialog
        className="dialog "
        shouldCloseOnOverlayClick={false}
        isShown={isShownAddUser}
        onCloseComplete={() => setIsShownAddUser(false)}
        hasFooter={false}
      >
        <div className="text-center mb-3">เพิ่มผู้ใช้งานในระบบ</div>
        <div>
          <TextInputField
            label="ชื่อ-นามสกุล"
            value={nameAd}
            onChange={(e) => setNameAd(e.target.value)}
          />
          <TextInputField
            label="ชื่อผู้ใช้งาน"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInputField
            label="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SelectField
            value={main_aid}
            onChange={(e) => setMain_aid(e.target.value)}
            label="หน่วยงานที่ประจำ"
          >
            {maindata.map((it, index) => (
              <option value={it.main_aid}>{it.main_aname}</option>
            ))}
          </SelectField>
        </div>
        <div className="d-flex fle-row justify-content-end p-3 ">
          <Button
            onClick={onSubmitUser}
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

export default ManageAc;
