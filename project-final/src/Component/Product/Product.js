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
    const main_aid = localStorage.getItem("main_aid")
    axios.post("http://localhost:4444/product",{
      main_aid:main_aid
    }).then((res) => {
      console.log(res.data);
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
            year: `${item.fisicalyear}` ,
            status: (
              `
                ${item.statuschk == null
                  ? item.pstatus_name
                  : item.statuschk == "1"
                  ? "ใช้งานปกติ"
                  : item.statuschk == "2"
                  ? "ชำรุด(รอซ่อมบำรุง)"
                  : item.statuschk == "3"
                  ? "บริจาค"
                  : item.statuschk == "4"
                  ? "เสื่อมคุณภาพ(ไม่จำเป็นต้องใช้ในราชการ)"
                  : "จำหน่ายออกจากบัญชี"}
                  `
            ),
            clickEvent: () => Detail(item.pid),
          })),
        ],
      });
    });
  }, []);
  return (
    <div className="container-fluid p-lg-5 p-md-3 p-0 ">
      <div className="bg-white p-3 " style={{ borderRadius: 15 }}>
        <div className="d-flex justify-content-end">
          <div className="btn-primary btn btn-sm" onClick={AddSingle}>
            เพิ่มครุภัณฑ์เดี่ยว
          </div>
          <div className="btn-secondary btn btn-sm">เพิ่มครุภัณฑ์กลุ่ม</div>
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
        >
          <AddPD closeAdd={CloseAdd} />
        </Dialog>
      </Pane>
    </div>
  );
}

export default Product;
