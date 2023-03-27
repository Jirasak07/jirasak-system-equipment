import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "evergreen-ui";
import { useLocation, useNavigate } from "react-router-dom";
// import { getCameraList } from "./Utils";
import Swal from "sweetalert2";

const qrConfig = { fps: 10, qrbox: { width: 180, height: 180 } };
let html5QrCode;

// function startCamera(){}

export const Scanner = (props) => {
  const navigate = useNavigate()
  const location = useLocation();
  const data = location.state?.id;
  const color = location.state?.color;
  const nameEvent = location.state?.data;
  const [cameraList, setCameraList] = useState([]);
  const [activeCamera, setActiveCamera] = useState();
  useEffect(() => {
    html5QrCode = new Html5Qrcode("reader");
    getCameras();
    const oldRegion = document.getElementById("qr-shaded-region");
    oldRegion && oldRegion.remove();
    return () => {
      handleStop();
    };
  }, []);

  const handleClickAdvanced = () => {
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      console.info(decodedResult, decodedText);
      props.onResult(decodedText);
      const promise = decodedText.slice(0, 4);
      if (promise === "KPRU") {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${nameEvent}ครุภัณฑ์หมายเลข ${decodedText}`,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        }).then((res) => {
          navigate("/product/check/" + decodedText);
        });
      } else if (promise != "KPRU") {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "ไม่ใช่ QRCode ของระบบ",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        }).then((res) => {
        });
      }

      handleStop();
    };
    html5QrCode
      .start({ facingMode: "environment" }, qrConfig, qrCodeSuccessCallback)
      .then(() => {
        // const oldRegion = document.getElementById("qr-shaded-region");
        // if (oldRegion) oldRegion.innerHTML = "";
      });
  };
  const getCameras = () => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        console.info(devices);
        if (devices && devices.length) {
          setCameraList(devices);
          setActiveCamera(devices[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        setCameraList([]);
      });
  };
  const onCameraChange = (e) => {
    if (e.target.selectedIndex) {
      let selectedCamera = e.target.options[e.target.selectedIndex];
      console.info(selectedCamera);
      let cameraId = selectedCamera.dataset.key;
      setActiveCamera(cameraList.find((cam) => cam.id === cameraId));
    }
  };
  const handleStop = () => {
    try {
      html5QrCode
        .stop()
        .then((res) => {
          html5QrCode.clear();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" d-flex flex-column container align-items-center h-100 justify-content-center ">
      <div
        className=" d-flex p-5 flex-column"
        style={{ maxWidth: 375, borderRadius: 20 }}
      >
        <div id="reader" width="100%"></div>
        <Button
          appearance="minimal"
          intent="success"
          style={{ fontSize: 18, color: color }}
          onClick={getCameras}
        >
          เลือกกล้องที่ต้องการ เพื่อ{nameEvent}
        </Button>
        {cameraList.length > 0 && (
          <select onChange={onCameraChange}>
            {cameraList.map((li) => (
              <option
                key={li.id}
                id={li.id}
                selected={activeCamera && activeCamera.id === li.id}
              >
                {li.label}
              </option>
            ))}
            <option>Dummy</option>
          </select>
        )}
        <div className="d-flex flex-column pt-3" style={{ gap: 5 }}>
          <Button
            intent="success"
            appearance="primary"
            onClick={() => handleClickAdvanced()}
          >
            คลิกเพื่อแสกน {props.type}
          </Button>
          <Button
            intent="danger"
            appearance="primary"
            onClick={() => handleStop()}
          >
            หยุดสแกน
          </Button>
        </div>
      </div>
    </div>
  );
};

function QRCodeScan(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [decodedValue, setDecodedValue] = useState("");
  return (
    <>
      <Scanner type="QR" onResult={(res) => setDecodedValue(res)} />
      {/* <br />
      <p style={{ width: "100%", wordWrap: "break-word" }}>
        <strong>Value:</strong>
        {decodedValue}
      </p> */}
    </>
  );
}

export default QRCodeScan;
