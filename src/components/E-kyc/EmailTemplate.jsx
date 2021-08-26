import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import $ from "jquery";
import * as EmailValidator from "email-validator";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import SERVER_ID from "./Configure/configure";

// import $ from "jquery"
// import "./verifyContact.css"

function EmailTemplate() {
  const [email, setEmail] = useState("");
  const [genOtp, setgenOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [apiURL, setApiURL] = useState("/api/Notify/EmailAPITest");
  const [open, setOpen] = React.useState(false);
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    $(".btn-verify").hide();
  }, []);

  const getSubmit = async (e) => {
    e.preventDefault();
    var val = Math.floor(1000 + Math.random() * 9000);
    if (EmailValidator.validate(email)) {
      // alert("Valid Email");
      $(".btn-submit").hide();
      $(".btn-verify").show();
      $("#Email").prop("disabled", true);
      setgenOtp(val);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        send_Email: email,
        user_Token: localStorage.getItem("user-token"),
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        SERVER_ID + "/api/EmailAuthentication/EmailAuthentication",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    } else {
      alert("Invalid Email");
      setEmail("");
    }
  };
  const getVerify = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("email-confirm")==="true") {
      setOpen(true);
      setTimeout(() => {
        // setOpen(true);
        window.location.href = "/PanEmailVerify";
      }, 3000)

    } else {
      setOpen(true);
       setTimeout(() => {
            alert("Please Verify Email");
            return;
          }, 3000)

    }
  };
  return (
    <div>
           <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Verify Email</h3>
            <div className="form-group">
              {/* <label>Enter Contact</label> */}
              <TextField
                type="text"
                id="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                label="Enter Email"
              />
              {/* <input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
            </div>
            {/* <div className="form-group div-otp"> */}
            {/* <label>OTP</label> */}
            {/* <TextField
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="form-control"
                label="Enter OTP"
              /> */}
            {/* <input type="text" value={otp} onChange={(e)=>setOtp(e.target.value)} className="form-control" placeholder="Enter password" /> */}
            {/* </div> */}

            <div className="btn-class-submit">
              {/* <button type="submit" onClick={getContact} className="btn btn-primary btn-block btn-otp">GET OTP</button> */}
              <button
                type="submit"
                onClick={getSubmit}
                className="btn btn-primary btn-block btn-submit"
              >
                Submit Email
              </button>
              <button
                type="submit"
                onClick={getVerify}
                className="btn btn-primary btn-block btn-verify"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EmailTemplate;
