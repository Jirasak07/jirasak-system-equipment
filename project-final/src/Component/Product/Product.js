import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
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
  const Detail = (val) => {
    setIsShown(!isShown);
    setPid(val);
  };
  const AddSingle = () => {
    setIsShownAdd(!isShownAdd);
  };
  useEffect(() => {
    axios.get("http://localhost:4444/product").then((res) => {
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
          },
          {
            field: "status",
            label: "สถานะ",
          },
        ],
        rows: [
          ...dMap.map((item) => ({
            pid: <div>{item.pid}</div>,
            pname: <div>{item.pname}</div>,
            sagen: <>{item.sub_aname}</>,
            year: <>{item.fisicalyear}</>,
            status: <>{item.pstatus_name}</>,
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
          <div className="btn-primary btn btn-sm" onClick={AddSingle} >เพิ่มครุภัณฑ์เดี่ยว</div>
          <div className="btn-secondary btn btn-sm">เพิ่มครุภัณฑ์กลุ่ม</div>
        </div>
        <MDBDataTableV5 data={data} responsive sortable={false} />
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
          <AddPD />
        </Dialog>
      </Pane>
    </div>
  );
}

export default Product;
