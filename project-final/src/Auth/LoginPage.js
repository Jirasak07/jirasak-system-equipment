import axios from "axios";
import { Button, TextInputField } from "evergreen-ui";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgLogo from "../assets/LOGO RGB PNG-สำหรับงานนำเสนอแบบดิจิติล.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./login.css";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    if (username == "admin") {
      axios.post("/check-admin",{
        username: username,
        password: pass
      }).then((res)=>{
        if(res.date.status == "yes"){
          // localStorage.setItem("user_id", res.data.user_id);
          // localStorage.setItem("main_aid", res.data.main_aid);
          // localStorage.setItem("token", res.data.token);
        }
      })
    } else {
      axios
        .post("http://localhost:4444/login", {
          username: username,
          password: pass,
        })
        .then((res) => {
          console.table(res.data);
          if (res.data.status === "ok") {
            Swal.fire({
              icon: "success",
              title: "ยินดีต้อนรับเข้าสู่ระบบ",
              timer: 900,
              showConfirmButton: false,
              timerProgressBar: true,
            }).then((val) => {
              localStorage.setItem("user_id", res.data.user_id);
              localStorage.setItem("main_aid", res.data.main_aid);
              localStorage.setItem("token", res.data.token);
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                navigate("/dashboard");
              }, 2000);
            });
          } else if (res.data.status == "error") {
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถเข้าสู่ระบบได้",
              timer: 900,
              showConfirmButton: false,
              timerProgressBar: true,
            });
          }
          // alert(JSON.stringify(res.data))
        });
    }

  };
  return loading ? (
    <div className=" d-flex ld ">
      <div class="spinner"></div>
    </div>
  ) : (
    <div
      className="container-fluid bg-login d-flex align-items-center justify-content-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        className="loginn w-100 p-4"
        style={{ minWidth: "375px", maxWidth: "550px", minHeight: "500px" }}
      >
        <div className="d-flex dlex-row justify-content-center">
          <img src={imgLogo} width={110} />
        </div>
        <div className="text-center pt-2" style={{ fontSize: 18 }}>
          ระบบตรวจสอบครุภัณฑ์
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center mt-2">
          <TextInputField
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            label="Username"
            width={250}
          />
          <TextInputField
            onChange={(e) => setPass(e.target.value)}
            name="password"
            type="password"
            label="Password"
            width={250}
          />
        </div>
        <div className="d-flex flex-row justify-content-center">
          <Button
            onClick={onSubmit}
            appearance="primary"
            intent="success"
            width={250}
          >
            เข้าสู่ระบบ
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
