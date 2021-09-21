import React, { useState, useRef, useEffect } from "react";
import RecordRTC from "recordrtc";
import { getLocation } from "../Helper/Helper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LoopSharpIcon from "@material-ui/icons/LoopSharp";
import { OtpVal } from "../Helper/Helper";
import "./VideoRecordStyle.css";
import { useHistory } from "react-router-dom";
import Image from "react-bootstrap/Image";
import img from "../../../images/black.png";
import SERVER_ID from "../Configure/configure";
const captureCamera = (callback) => {
  navigator.mediaDevices
    .getUserMedia({
      // audio: true,
      video: {
        width: {
          ideal: 1920,
        },
        height: {
          ideal: 1080,
        },
        frameRate: {
          ideal: 60,
        },
        facingMode: `user`,
      },
    })
    .then((camera) => {
      callback(camera);
    })
    .catch((error) => {
      alert(error.message);
    });
};

function VideoRecord({ props, sendToParent }) {
  const [recorder, setRecorder] = useState(null);
  const videoElement = useRef(null);
  const [flag, setFlag] = useState(false);
  const [disable, SetDisable] = useState(false);
  const [pass, SetPass] = useState("");
  const [numData, SetNumData] = useState("");
  const [textVisible, SetTextVisible] = useState(
    "Click on recording button to get the OTP on screen"
  );
  const [otpVisible, SetOtpVisible] = useState(false);
  const [otpField, SetOtpField] = useState(true);
  const [ipvData, SetIpvData] = useState("");
  const [Bimg, SetBImg] = useState(img);

  let history = useHistory();
  useEffect(() => {
    if (flag === true) {
      setTimeout(() => {
        onStopRecordVideo();
      }, 5000);
    }
  }, [flag]);

  const onStartRecordVideo = () => {
    getLocation(function (data) {
      console.log("data from child:", data);
      // work with your data came from server
    });
    SetBImg(null);
    setFlag(true);
    SetTextVisible("");
    SetOtpVisible(true);
    SetOtpField(false);
    captureCamera((camera) => {
      videoElement.current.srcObject = camera;
      const recordRTC = RecordRTC(camera, {
        type: `video`,
      });
      recordRTC.startRecording();
      recordRTC.camera = camera;
      videoElement.current.play();
      setRecorder(recordRTC);
    });
    setTimeout(() => {
      document.getElementById("myButton").click();
    }, 14000);
    SetDisable(true);
    const RandNums = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    SetNumData(RandNums);
  };

  const onStopRecordVideo = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        videoElement.current.src = videoElement.current.srcObject = null;
        const data = (videoElement.current.src = URL.createObjectURL(
          recorder.getBlob()
        ));
        console.log("VideoRecord Data: ", data);
        SetIpvData(data);
        recorder.camera.stop();
        recorder.destroy();
        // setRecorder(null);
        sendToParent(data);
      });
    }
    SetDisable(true);
  };

  const detectWebcam = (event) => {
    let video = navigator.mediaDevices;
    if (!video || !video.enumerateDevices) return event(false);
    video.enumerateDevices().then((devices) => {
      event(devices.some((device) => "videoinput" === device.kind));
    });
  };

  detectWebcam(function (hasWebcam) {
    console.log(
      hasWebcam ? "Camera works Properly" : "Something wrong with your camera!"
    );
  });

  const HandleRepeater = () => {
    SetIpvData("");
    onStartRecordVideo();
    onStopRecordVideo();
  };
  const changeHandler = (e) => {
    e.preventDefault();
    OtpVal();
    SetPass(e.target.value);
  };

  const handleClick = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    var raw = JSON.stringify({
      method_Name: "Update_Stage_Id",
      mobile_No: localStorage.getItem("userInfo"),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${SERVER_ID}/api/lead/Update_StageId`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    history.push("/Esign");
  };

  // const Image=
  return (
    <div>
      <div className="otp-st">
        <div style={{ fontSize: "12px" }}>
          {numData ? (
            <h4 style={{ color: "black" }}>{numData}</h4>
          ) : (
            <span>{textVisible}</span>
          )}
        </div>
        <div></div>
      </div>
      <br />
      <br />

      {Bimg ? (
        <Image src={Bimg} fluid style={{ height: `44vh`, width: `35vw` }} />
      ) : (
        <video
          playsInline
          // autoPlay
          ref={videoElement}
          style={{ width: `35vw` }}
        />
      )}

      <br />
      <br />
      <TextField
        type="number"
        variant="outlined"
        id="fieldOtp"
        autoComplete="off"
        value={pass}
        disabled={otpField}
        onChange={changeHandler}
        className="form-control"
        label="Enter the OTP"
        style={{ width: `17rem` }}
      />
      <br />
      <br />
      <br />
      <div>
        {!recorder && (
          <Button
            type="button"
            className="btn-comman text-white"
            inputProps={{
              style: { textTransform: "lowecase" },
            }}
            onClick={onStartRecordVideo}
          >
            Start recording
          </Button>
        )}
        {recorder && (
          <Button
            id="myButton"
            type="button"
            className="btn-comman text-white"
            style={{ display: "none" }}
            onClick={() => onStopRecordVideo(props)}
          >
            Stop recording & play video
          </Button>
        )}
        {ipvData && (
          <Button
            type="button"
            className="btn-comman text-white"
            onClick={handleClick}
          >
            Proceed
          </Button>
        )}
        <br />
        {ipvData && (
          <Button className="mt-2" onClick={HandleRepeater}>
            <LoopSharpIcon />
            Retry
          </Button>
        )}
        <div className="mt-2" style={{ fontSize: "11px", color: "#8C92AC" }}>
          <b className="link-comman">Share</b> the verification link to your
          mobile number <br /> if you don't have webcam available
        </div>
      </div>
    </div>
  );
}

export default VideoRecord;
