import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
// import $ from "jquery"
// import "./verifyContact.css"

function VerifyPin() {
  const [pin, setPin] = useState("");

  const getSubmit = (e) => {
    e.preventDefault();
    if (pin !== "") {
      window.location.href = "/AllowAccess";
      // return
    }
  };
  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Verify PIN</h3>
            <div className="form-group">
              {/* <label>Enter Contact</label> */}
              <TextField
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="form-control"
                label="Enter PIN"
              />
              {/* <input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
            </div>

            {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}
            <div className="btn-class-submit">
              {/* <button type="submit" onClick={getContact} className="btn btn-primary btn-block btn-otp">GET OTP</button> */}
              <button
                type="submit"
                onClick={getSubmit}
                className="btn btn-primary btn-block btn-submit"
              >
                Submit
              </button>
            </div>
            {/* <p className="forgot-password text-right">
                    Wrong <Link >Number?</Link>
                </p> */}
          </form>
        </div>
      </div>
    </div>
  );
}
export default VerifyPin;
