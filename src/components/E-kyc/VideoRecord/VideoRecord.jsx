import ReactDOM from "react-dom";
import React, { useState, useRef, useEffect } from "react";
import RecordRTC from "recordrtc";
import { getLocation } from "../Helper/Helper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LoopSharpIcon from "@material-ui/icons/LoopSharp";

const captureCamera = (callback) => {
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
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

const VideoRecord = () => {
  const [recorder, setRecorder] = useState(null);
  const videoElement = useRef(null);
  const [flag, setFlag] = useState(false);
  const [disable, SetDisable] = useState(false);
  const [value, SetValue] = useState({
    otp: "",
  });

  useEffect(() => {
    if (flag === true) {
      setTimeout(() => {
        onStopRecordVideo();
      }, 5000);
    }
  }, [flag]);
  const onStartRecordVideo = () => {
    getLocation();
    setFlag(true);
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
  };

  const onStopRecordVideo = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        videoElement.current.src = videoElement.current.srcObject = null;
        videoElement.current.src = URL.createObjectURL(recorder.getBlob());
        console.log(videoElement.current.src);
        recorder.camera.stop();
        recorder.destroy();
        // setRecorder(null);
      });
    }
    SetDisable(true);
  };
  const HandleRepeater = () => {
    onStartRecordVideo();
    onStopRecordVideo();
    console.log(value);
  };

  const DataHandler = (e) => {
    let vals = e.target.value;
    let name = e.target.name;
    SetValue((eve) => {
      return { ...eve, [name]: vals };
    });
    // console.log(value);
  };

  return (
    <div>
      <video
        controls
        playsInline
        autoPlay
        ref={videoElement}
        style={{ width: `30vw` }}
      />
      <br />
      <br />
      <TextField
        style={{ width: `20vw` }}
        type="number"
        variant="outlined"
        autoComplete="off"
        name="otp"
        value={value.otp}
        onChange={DataHandler}
        className="form-control"
        label="Enter the OTP"
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
            inputProps={{
              style: { textTransform: "lowecase" },
            }}
            onClick={onStopRecordVideo}
          >
            Stop recording and play record video
          </Button>
        )}
        <br />
        <br />
        <Button onClick={HandleRepeater}>
          <LoopSharpIcon />
          Retry
        </Button>
        <br />
        <text style={{ fontSize: "10px", color: "#8C92AC" }}>
          <b>Share</b> the verification link to your mobile number if you don't
          have webcam available
        </text>
      </div>
    </div>
  );
};

export default VideoRecord;
