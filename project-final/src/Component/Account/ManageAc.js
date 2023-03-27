import React, { useEffect, useState } from "react";
import { Button,Dialog } from "evergreen-ui";
import axios from "axios";
import { MDBDataTable } from "mdbreact";

function ManageAc() {
  const [isShownAdd, setIsShownAdd] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    
    axios.get("http://localhost:4444/show-user").then((res) => {
      const user = res.data;
      setUsers({
        columns: [
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
          ...user.map((item) => ({
            name: `${item.name}`,
            username: `${item.username}`,
            main: `${item.main_aname}`,
            status: `${item.ustatus_name}`,
            manage: <Button className="bg-warning border" appearance="primary" onClick={()=>setIsShownAdd(!isShownAdd)}  > แก้ไข </Button>
          })),
        ],
      });
    });
    return () => {};
  }, []);
  return (
    <div className="container">
      <div className="d-flex flex-row justify-content-end">
        <Button intent="primary" appearance="primary">
          เพิ่มผู้ใช้งาน
        </Button>
      </div>

      <div className="bg-white card p-3 mt-2">
        <MDBDataTable data={users} />
      </div>
      <Dialog
          className="dialog "
          shouldCloseOnOverlayClick={false}
          isShown={isShownAdd}
          onCloseComplete={() => setIsShownAdd(false)}
          hasFooter={false}
        >
        
        </Dialog>
    </div>
  );
}

export default ManageAc;
