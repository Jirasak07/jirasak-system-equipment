import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { QRCode as QRC } from "react-qrcode-logo";
import "./QRCode.css";
import logoQr from "../../assets/LOGO RGB PNG-สำหรับงานนำเสนอแบบดิจิติล.png";


function QRCode(props) {
  const printRef = useRef();
  const Dow = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    if (typeof link.download === "string") {
      link.href = data;
      link.download = `${props.id}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }

  };
  return (
    // <>

    <>
      <div ref={printRef}>
        <div className="flex-column align-items-center d-flex justify-content-center canvas ">
          <QRC
            logoImage={logoQr}
            logoWidth="45"
            logoHeight="50"
            size="250"
            value={props.id}
          />
          <h5 className="fontQr"> {props.id}</h5>
        </div>
      </div>
      <div className="grid  text-center">
        <div onClick={Dow} className="btn btn-success btn-sm">
          ดาวน์โหลด
        </div>
      </div>
    </>
  );
}

export default QRCode;
