import React, { useState } from "react";
import axios from "axios";
import SERVER_ID from "./Configure/configure";
function PanOrc() {
  const [panImg, setpanImg] = useState("");
  const [backendData, setbackendData] = useState("");
  const [apiURL, setApiURL] = useState("/api/user/login/OCR");
  const getFiles = (e) => {
    setpanImg(e.target.files[0]);
    // console.log(e.target.files[0]);
  };

  // onFileUpload = () => {};

  const getSubmit = (e) => {
    e.preventDefault();
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("front_part", panImg);

    // Details of the uploaded file
    console.log(formData);

    axios
      .post(SERVER_ID + apiURL, formData)
      .then((data) => {
        data && setbackendData(data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  // useEffect(() => {
  //   const obj = JSON.parse();
  //   setdisplay(obj);
  // }, [backendData]);

  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>PAN OCR</h3>
            <div className="form-group">
              {/* <label>Enter Contact</label> */}
              <input
                type="file"
                // name="file"
                // value={panImg}
                onChange={(e) => getFiles(e)}
                // label="Enter Email"
              />
              {/* <input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
            </div>
            <div className="btn-class-submit">
              {/* <button type="submit" onClick={getContact} className="btn btn-primary btn-block btn-otp">GET OTP</button> */}{" "}
              <button
                type="submit"
                onClick={getSubmit}
                className="btn btn-primary btn-block btn-submit"
              >
                Submit
              </button>
            </div>
            <br />
            {backendData ? (
              <div>
                <img
                  // width="200" height="200"
                  src={`data:image/png;base64,${backendData.encoded_image}`}
                />
                <br />
                <br />
                <img
                  width="200"
                  //  height="200"
                  src={`data:image/png;base64,${backendData.encoded_signature}`}
                />
                <br />
                <br />
                <button
                  type="submit"
                  onClick={getSubmit}
                  className="btn btn-primary btn-block btn-submit"
                >
                  Proceed To Esign
                </button>
              </div>
            ) : (
              ""
            )}

            {/* {backendData.encoded_image} */}
          </form>
        </div>
      </div>
    </div>
  );
}
export default PanOrc;
