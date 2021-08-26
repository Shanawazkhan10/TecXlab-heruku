import ReactDOM from "react-dom";
import React, { useState, useRef, useEffect } from "react";
import RecordRTC from "recordrtc";
import { getLocation } from "../Helper/Helper";
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
    }, 15000);
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
  };

  return (
    <>
      <div>
        {!recorder && (
          <button type="button" onClick={onStartRecordVideo}>
            Start recording
          </button>
        )}

        {recorder && (
          <button id="myButton" type="button" onClick={onStopRecordVideo}>
            Stop recording and play record video
          </button>
        )}
      </div>

      <video
        controls
        playsInline
        // autoPlay
        ref={videoElement}
        style={{ width: `70vw` }}
      />
    </>
  );
};

export default VideoRecord;
