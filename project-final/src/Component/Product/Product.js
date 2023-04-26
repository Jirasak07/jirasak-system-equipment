import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { AiFillEye } from "react-icons/ai";
import "./PDStyle.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import QRCode from "../QRCode/QRCode";
import { Pane, Dialog, Button } from "evergreen-ui";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import AddPD from "./AddPD";
import DetailProduct from "./DetailProduct";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
function Product() {
  const swal = withReactContent(Swal);
  const [data, setData] = useState({ skdjhfksjf: "kdjfkdf" });
  const [isShown, setIsShown] = useState(false);
  const [isShownAdd, setIsShownAdd] = useState(false);
  const [pid, setPid] = useState();
  const [chkname, setChkName] = useState();
  const [status, setStatus] = useState();
  const Detail = (val) => {
    setIsShown(!isShown);
    setPid(val);
  };
  const AddSingle = () => {
    setIsShownAdd(!isShownAdd);
  };
  const CloseAdd = () => {
    setIsShownAdd(!isShownAdd);
  };
  useEffect(() => {
    const main_aid = localStorage.getItem("main_aid");
    axios
      .post("http://localhost:4444/product", {
        main_aid: main_aid,
      })
      .then((res) => {
        console.log("data product" + res.data);
        const dMap = res.data;
        setData({
          columns: [
            {
              field: "pid",
              label: "หมายเลขครุภัณฑ์",
            },
            {
              field: "pname",
              label: "รายการ",
            },
            {
              field: "sagen",
              label: "หน่วยงาน",
            },
            {
              field: "year",
              label: "ปีที่ตรวจ",
              sort: "desc",
            },
            {
              field: "status",
              label: "สถานะ",
            },
          ],
          rows: [
            ...dMap.map((item) => ({
              pid: `${item.pid}`,
              pname: `${item.pname}`,
              sagen: `${item.sub_aname}`,
              year: `${item.check_year}`,
              status: `
                ${
                  item.statuschk == null
                    ? item.pstatus_name
                    : item.statuschk == "1"
                    ? "ใช้งานปกติ"
                    : item.statuschk == "2"
                    ? "ชำรุด(รอซ่อมบำรุง)"
                    : item.statuschk == "3"
                    ? "บริจาค"
                    : item.statuschk == "4"
                    ? "เสื่อมคุณภาพ(ไม่จำเป็นต้องใช้ในราชการ)"
                    : "จำหน่ายออกจากบัญชี"
                }
                  `,
              clickEvent: () => Detail(item.pid),
            })),
          ],
        });
      });
  }, []);
  return (
    <div className="container-fluid ">
      <div>
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink underline="hover" color="inherit" to="/dashboard">
            Home
          </NavLink>
          <Typography color="text.primary">Product</Typography>
        </Breadcrumbs>
      </div>
      <div className="bg-white p-3 mt-3 " style={{ borderRadius: 15 }}>
        <div className="px-4">ตารางแสดงข้อมูลครุภัณฑ์</div>
        <div className="d-flex justify-content-end" style={{ gap: 10 }}>
          <Button
            appearance="minimal"
            intent="success"
            className="text-white bg-primary"
            onClick={AddSingle}
          >
            เพิ่มครุภัณฑ์เดี่ยว
          </Button>
          <Button
            appearance="minimal"
            intent="success"
            className="btn-secondary text-white"
          >
            เพิ่มครุภัณฑ์กลุ่ม
          </Button>
        </div>
        <MDBDataTable
          data={data}
          responsive
          sortable={true}
          entriesLabel="จำนวนต่อหน้า"
        />
      </div>
      <Pane className="dialog">
        <Dialog
          className="dialog "
          isShown={isShown}
          onCloseComplete={() => setIsShown(false)}
          hasFooter={false}
          width="800px"
        >
          <DetailProduct id={pid} />
        </Dialog>
      </Pane>
      <Pane className="dialog">
        <Dialog
          className="dialog "
          shouldCloseOnOverlayClick={false}
          isShown={isShownAdd}
          onCloseComplete={() => setIsShownAdd(false)}
          hasFooter={false}
          minWidth={378}
          width={800}
        >
          <AddPD closeAdd={CloseAdd} />
        </Dialog>
      </Pane>
    </div>
  );
}

export default Product;
