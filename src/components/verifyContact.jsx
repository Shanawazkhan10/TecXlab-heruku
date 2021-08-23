import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import $ from "jquery";
import "./verifyContact.css";
import SERVER_ID from "../configure";
import { useLocalStorage } from "../CustomHooks/useLocalStorage";
import { conVal } from "../Helper/Helper";
import { Container, Row, Col } from 'reactstrap'
import Image from 'react-bootstrap/Image'
import { makeStyles } from "@material-ui/core/styles";
import SubInputAdornment from './SubComponent/SubInputAdornment'
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    // width: 280,
    "&:hover .MuiInputLabel-root": {
      color: theme.palette.text.primary
    },
    "& .Mui-focused.MuiInputLabel-root": {
      color: theme.palette.primary.main
    }
  },
  outlinedInput: {
    "&:hover .MuiInputAdornment-root .MuiSvgIcon-root": {
      color: theme.palette.text.primary
    },
    "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
      color: theme.palette.primary.main
    }
  }
}));
function VerifyContact() {
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [generateOtp, setgenerateOtp] = useState("");
  const [otpTime, setotpTime] = useState("60");
  const [Token, setToken] = useState("");
  const [userToken, setUserToken] = useLocalStorage("user-token", "");
  const classes = useStyles();
  const [errorMsg, seterrorMsg] = useState({
    errorOBJ: {
      errorOTP: "",
    },
  });

  useEffect(() => {
    if (otp.length === 4) {
      if (otp === generateOtp) {
        getSubmit();
      } else {
        seterrorMsg((prevState) => ({
          ...prevState,
          errorOBJ: {
            ...prevState.errorOBJ,
            errorOTP: "WRONG OTP!",
          },
        }));
      }
    }
    if (otp.length <= 3) {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorOTP: "",
        },
      }));
    }
  }, [otp]);

  useEffect(() => {
    $(".btn-submit").hide();
    $("#resend").hide();
    $("#countdown").hide();
    setContact("");
    setOtp("");
  }, []);
  useEffect(() => {
    if (otpTime === 0) {
      $("#resend").show();
      $("#countdown").hide();
    } else {
      $("#resend").hide();
    }
  }, [otpTime]);

  const handleChange = (e) => {
    e.preventDefault();
    conVal();
    setContact(e.target.value);
  };
  const smsVerify = async (e) => {
    e.preventDefault();
    if (contact.length == 10) {
      $(".btn-otp").hide();
      $(".btn-submit").show();
      $("#countdown").show();
      $("#resend").hide();
      // for timer
      var i = 60;
      (function timer() {
        if (--i < 0) return;
        setTimeout(function () {
          setotpTime(i);
          timer();
        }, 1000);
      })();
      // end timer

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        contact_No: contact,
        otp: generateOtp,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(SERVER_ID + "/api/MobileAuthentication/Send_OTP", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          result && setgenerateOtp(result);
        })
        .catch((error) => console.log("error", error));

      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
        SERVER_ID +
          "/GenerateJWTWebToken?Contact=" +
          contact +
          "&IsMobileVerified=true",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          setToken(result);
        })
        .catch((error) => console.log("error", error));
    }
  };
  const getSubmit = async (e) => {
    setUserToken(Token);
    window.location.href = "/EmailTemplate";
  };

  return (
    <div>
      <Container>
      <Row> 
        <Col className="mt-2" md="7">
        <Image className="login-img-res" src={require("../images/LoginPage.png")} fluid />
        </Col>
        <Col md="3" className=" div-center">
      {/* <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        > */}
          <form className="form-verify">
            <h3 className="float-left">Registration
            </h3>     
            <br/> 
            <hr className=" hr-verify color-gradiant"/>   
            <p className="float-left font-weight-bold">Already have account? Signin</p>
            <br/>
            <div className="form-group">
              {/* <label>Enter Contact</label> */}
              <TextField
                type="number"
                id="fieldSelectorNo"
                pattern="[1-9]{1}[0-9]{9}"
                value={contact}
                onChange={handleChange}
                className="form-control"
                label="Enter Contact"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <SubInputAdornment Dataicon={<Image className="login-img-res" src={require("../assets/mobile.svg")} fluid />}/>
                  ),
                 }}
              />
              {/* <input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
            </div>
            <div className="form-group div-otp">
              {/* <label>OTP</label> */}
              <TextField
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="form-control mt-3"
                label="Enter OTP"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <SubInputAdornment Dataicon={<Image className="login-img-res" src={require("../assets/Mobile-OTP.svg")} fluid />}/>
                  ),
                 }}
              />
              {/* <input type="text" value={otp} onChange={(e)=>setOtp(e.target.value)} className="form-control" placeholder="Enter password" /> */}
            </div>
            {errorMsg.errorOBJ.errorOTP && (
              <p className="text-error">{errorMsg.errorOBJ.errorOTP}</p>
            )}
            {/* <br/> */}
                <div className="form-group ">
              <TextField
                type="text"
                // value={name}
                id="fieldSelectorname"
                // onChange={handleNameChange}
                className="form-control mt-3"
                label="Referal Code (Optional)"
                autoComplete="off"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <SubInputAdornment Dataicon={<Image className="login-img-res" src={require("../assets/Referral Code grey.svg")} fluid />}/>
                  ),
                 }}
              />
               </div>
            <div className="form-group otp-time">
              <p id="countdown" style={{ textAlign: "center" }}>
                Resend Link in {otpTime} sec.
              </p>
              <p
                id="resend"
                style={{ textAlign: "center" }}
                onClick={smsVerify}
              >
                Resend via <Link to=""> sms.</Link>
              </p>
              {/* <p id="counter" style={{textAlign: "center"}}></p> */}
            </div>
            <div className="btn-class-submit">
              <Button
                type="submit"
                fullWidth="true"
                onClick={smsVerify}
                className="btn font-weight-bold color-gradiant form-control text-white border-0 btn-block btn-comman btn-otp"
              >
                Proceed
              </Button>
              {/* <Button variant="contained" fullWidth="true" color="primary" disableElevation>
      Disable elevation
    </Button> */}
              {/* <button
                type="submit"
                onClick={getSubmit}
                className="btn btn-primary btn-block btn-submit"
              >
                Submit
              </button> */}
            </div>
            <br/>
          </form>
          {/* </FormControl> */}
        {/* </div>
      </div> */}
        </Col>
      </Row> 
      </Container>

    </div>
  );
}
export default VerifyContact;
