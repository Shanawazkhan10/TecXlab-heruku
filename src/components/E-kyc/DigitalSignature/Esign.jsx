import React, { createContext } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
// import { SignData } from '../../Feature/Feature';
// import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
const FinalizeData = createContext();

const Esign = ({ EsignData, HandleModalCloser }) => {
  const [disable, SetDisable] = useState(false);
  const [retryDisable, SetRetryDisable] = useState(true);
  const SignRef = useRef({});
  const BtnRef = useRef();
  // const [show, SetShow] = useState(false);
  // const dispatch = useDispatch();
  // let history = useHistory();

  const ClearHandler = () => {
    SignRef.current.clear();
  };

  //Disable Handler only for normal buttons
  const DisableButtonHandler = () => {
    if (BtnRef.current) {
      BtnRef.current.setAttribute("disabled", "disabled");
    }
  };
  function b64toBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  }
  const SaveHandler = () => {
    DisableButtonHandler();
    const dataFromPad = SignRef.current.toDataURL();

    fetch(dataFromPad)
      .then((res) => res.blob())
      .then((blob) => {
        // console.log(blob);
        var data = window.URL.createObjectURL(blob);
        EsignData(data);
      });

    SetDisable(true);

    // dispatch(
    //   SignData({
    //     esign: data,
    //     // name: 'sbxbbx',
    //     // dob: '15-august-2021',
    //   })
    // );
    // history.push('/Preview');
    // const finalData = [data];
    // console.log(finalData);
    // const test = SetImageData([...finalData]);
    // console.log(test);

    // SignDataHandler();
    ClearHandler();
    HandleModalCloser();
    // window.location = "/Preview";
  };
  // const SignDataHandler = () => {
  //   // const SampleData = 'This is sampled data coming from SignDataHandler func';
  //   // console.log(SampleData);
  // };
  return (
    <div>
      <>
        {/* <FinalizeData.Provider value="THIS IS THE VALUE FROM Esign Component"> */}
        {/* <div className="auth-wrapper">
          <div className="auth-inner"> */}
        {/* <h5>Add your Digital Signature (E-sign)</h5> */}
        <div
          style={{
            border: "1px solid gray",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <SignatureCanvas
            ref={SignRef}
            canvasProps={{
              width: "334px",
              height: "250px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
          }}
        >
          <Button
            ref={BtnRef}
            className="btn-comman text-white"
            variant="contained"
            color="primary"
            disabled={disable}
            onClick={SaveHandler}
            style={{ marginRight: "20px" }}
          >
            Upload
          </Button>
          <Button
            className="btn-comman text-white"
            variant="contained"
            color="primary"
            onClick={ClearHandler}
            style={{ marginLeft: "20px" }}
            // disabled={retryDisable}
          >
            Retry
          </Button>
        </div>
      </>
    </div>
  );
};

export default Esign;
export { FinalizeData };
