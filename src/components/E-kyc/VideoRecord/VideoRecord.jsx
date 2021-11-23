import React, { useState, useRef, useEffect } from "react";
import RecordRTC from "recordrtc";
import { getLocation } from "../Helper/Helper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LoopSharpIcon from "@material-ui/icons/LoopSharp";
import { mobileOtp, OtpVal } from "../Helper/Helper";
import "./VideoRecordStyle.css";
import { useHistory } from "react-router-dom";
import Image from "react-bootstrap/Image";
import img from "../../../images/black.png";
import SERVER_ID from "../Configure/configure";
import "./VideoRec.css";
import { Col } from "reactstrap";
// import { HiOutlineLightBulb } from "react-icons/hi";
// import { GiSunglasses } from "react-icons/gi";
// // import LightbulbIcon from '@mui/icons-material/Lightbulb';
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { FaRedhat } from "react-icons/fa";
import { ORG_ID } from "../Helper/Helper";
const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};
const INITIAL_COUNT = 12;
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

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
  const [mpData, SetMpData] = useState("");
  const videoElement = useRef(null);
  const [flag, setFlag] = useState(false);
  const [disable, SetDisable] = useState(false);
  const [pass, SetPass] = useState("");
  const [numData, SetNumData] = useState("");
  const [OtpValue, SetOtpValue] = useState("");
  const [textVisible, SetTextVisible] = useState(
    "Click on recording button to get the OTP on screen"
  );
  const [otpVisible, SetOtpVisible] = useState(false);
  const [otpField, SetOtpField] = useState(true);
  const [ipvData, SetIpvData] = useState("");
  const [Bimg, SetBImg] = useState(img);
  // const [isProceedVisible, setIsProceedVisible] = useState(true);

  const [errorMsg, seterrorMsg] = useState({
    errorOBJ: {
      OtpError: "",
    },
  });
  //Counter
  const twoDigits = (num) => String(num).padStart(2, "0");
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STOPPED);

  const secondsToDisplay = secondsRemaining % 60;

  const handleStart = () => {
    setStatus(STATUS.STARTED);
  };
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
    // passing null stops the interval
  );
  useEffect(() => {
    const myFile = new File([ipvData], "demo.mp4", {
      type: "video/mp4",
    });
    SetMpData(myFile);
  }, [ipvData]);
  let history = useHistory();
  // useEffect(() => {
  //   if (flag === true) {
  //     setTimeout(() => {
  //       onStopRecordVideo();
  //     }, 13000);
  //   }
  // }, [flag]);

  const onStartRecordVideo = () => {
    handleStart();
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
    }, 13000);
    // setTimeout(() => {
    //   document.getElementById("myButton").click();
    // }, 6000);
    SetDisable(true);
    // API POST
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      org_Id: ORG_ID,
      lead_Id: localStorage.getItem("lead_Id"),
      method_Name: "IPV_OTP",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${SERVER_ID}/api/in_person_verification/IPV_OTP`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log("xwxwwcccw", result);
        SetNumData(result.res_Output[0].result_Description);
      })
      .catch((err) => console.log(err));
    // const RandNums = (Math.floor(Math.random() * 10000) + 10000)
    //   .toString()
    //   .substring(1);
    // SetNumData(RandNums);
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
  useEffect(() => {
    detectWebcam(function (hasWebcam) {
      console.log(
        hasWebcam
          ? "Camera works Properly"
          : "Something wrong with your camera!"
      );
    });
  }, []);

  const HandleRepeater = () => {
    SetPass("");
    SetIpvData("");
    onStartRecordVideo();
    onStopRecordVideo();
    seterrorMsg((preState) => ({
      ...preState,
      errorOBJ: {
        ...preState.errorOBJ,
        OtpError: "",
      },
    }));
  };
  const changeHandler = (e) => {
    e.preventDefault();
    OtpVal();
    SetPass(e.target.value);
  };

  const handleClick = async () => {
    if (pass === "") {
      seterrorMsg((preState) => ({
        ...preState,
        errorOBJ: {
          ...preState.errorOBJ,
          OtpError: "Please enter OTP",
        },
      }));
    } else {
      // API POST
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("userToken")}`
      );
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        org_Id: ORG_ID,
        lead_Id: localStorage.getItem("lead_Id"),
        method_Name: "Verify_IPV_OTP",
        otp: pass,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      await fetch(
        `${SERVER_ID}/api/in_person_verification/Verify_IPV_OTP`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.res_Output[0].result_Description === "Invalid OTP") {
            seterrorMsg((preState) => ({
              ...preState,
              errorOBJ: {
                ...preState.errorOBJ,
                OtpError: "Please enter correct OTP",
              },
            }));
          } else {
            UploadVideoDoc();
            // for upload video
            // var myHeaders = new Headers();
            // myHeaders.append("Content-Type", "application/json");
            // myHeaders.append(
            //   "Authorization",
            //   `Bearer ${localStorage.getItem("userToken")}`
            // );
            // var raw = JSON.stringify({
            //   method_Name: "Update_Stage_Id",
            //   // mobile_No: localStorage.getItem("userInfo"),
            //   org_Id: ORG_ID,
            //   lead_Id: localStorage.getItem("lead_Id"),
            // });
            // var requestOptions = {
            //   method: "POST",
            //   headers: myHeaders,
            //   body: raw,
            //   redirect: "follow",
            // };
            // fetch(`${SERVER_ID}/api/lead/Update_StageId`, requestOptions)
            //   .then((response) => response.json())
            //   .then((result) => {
            //     // console.log(result.res_Output[0].stage_Id);
            //     history.push(result.res_Output[0].stage_Id);
            //   })
            //   .catch((error) => console.log("error", error));
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const UploadVideoDoc = async () => {
    // console.log("IPV DATA", myFile);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );

    var formdata = new FormData();
    formdata.append("Lead_Id", localStorage.getItem("lead_Id"));
    formdata.append("File", mpData);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${SERVER_ID}/api/in_person_verification/Video_Upload`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    // staged id
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    var raw = JSON.stringify({
      method_Name: "Update_Stage_Id",
      // mobile_No: localStorage.getItem("userInfo"),
      org_Id: ORG_ID,
      lead_Id: localStorage.getItem("lead_Id"),
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    await fetch(`${SERVER_ID}/api/lead/Update_StageId`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.res_Output[0].stage_Id);
        history.push(result.res_Output[0].stage_Id);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    if (pass !== "" && pass === numData) {
      seterrorMsg((preState) => ({
        ...preState,
        errorOBJ: {
          ...preState.errorOBJ,
          OtpError: "",
        },
      }));
    }
  }, [pass, numData]);

  // const handleOtp = () => {
  //   if (pass !== numData && pass.length <= 4) {
  //     seterrorMsg((preState) => ({
  //       ...preState,
  //       errorOBJ: {
  //         ...preState.errorOBJ,
  //         OtpError: 'Please enter correct OTP',
  //       },
  //     }));
  //   }
  // };

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
        <Image src={Bimg} style={{ height: `44vh`, width: `35vw` }} />
      ) : (
        <video playsInline ref={videoElement} style={{ width: `35vw` }} />
      )}
      {recorder && (
        <div style={{ fontSize: "10px", marginBottom: "2px" }}>
          Recording will be stop in {twoDigits(secondsToDisplay)}
        </div>
      )}
      <TextField
        type="number"
        error={errorMsg.errorOBJ.OtpError ? true : false}
        variant="outlined"
        id="fieldOtp"
        autoComplete="off"
        value={pass}
        disabled={otpField}
        // onBlur={handleOtp}
        onChange={(e) => changeHandler(e)}
        className="form-control mb-3 mt-2"
        // onBlur={handleOTO}
        label="Enter the OTP"
        style={{ width: `17rem` }}
      />
      <Col className="mb-3">
        {errorMsg.errorOBJ.OtpError && (
          <div className="div-msg">
            <span className="div-err">{errorMsg.errorOBJ.OtpError}</span>
          </div>
        )}
      </Col>

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
            // disabled={isProceedVisible}
          >
            Proceed
          </Button>
        )}
        {/* {ipvData && pass === numData && pass.length <= 4 && (
          <Button
            type="button"
            className="btn-comman text-white"
            onClick={handleClick}
            // disabled={setIsProceedVisible}
          >
            Proceed
          </Button>
        )} */}
        <br />
        {/* {ipvData && SetOtpField(false)} */}
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
