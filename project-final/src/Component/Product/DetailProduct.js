import axios from "axios";
import React, { useEffect, useState } from "react";

function DetailProduct({ id }) {
  const [data, setData] = useState();
  const [pid, setPid] = useState();
  const [pname, setPname] = useState();
  const [detail, setDetail] = useState();
  const [qty,setQty] = useState();
  const [finance,setFinance] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:4444/detail-pd", {
        pid: id,
      })
      .then((res) => {
        const datat = res.data[0];
        setPid(datat.pid);
        setPname(datat.pname);
        setDetail(datat.pdetail);
        setQty(datat.qty+" "+datat.unit)
        setFinance(data.finance)

      });
  }, [id]);
  return (
    <div className=" py-4 px-2" style={{ borderRadius: 15 }}>
      <div className="py-3 px-2 d-flex flex-column shadow rounded ">
        <div className="d-flex flex-row ">
          <div className="col-4 d-flex justify-content-center">
            <img src="https://picsum.photos/150/150" />
          </div>
          <div className="col-8 p-2 " style={{ fontSize: "100%" }}>
            <div>{pid}</div>
            <div>{pname}</div>
            <div>... {detail}</div>
          </div>
        </div>
        <div className=" mt-2 bg-danger">
            <div>จำนวน : {qty} </div>
            <div>งบ </div>

        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
