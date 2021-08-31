import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import $ from "jquery";
import "./verifyContact.css";
import SERVER_ID from "../Configure/configure";
import { useLocalStorage } from "../CustomHooks/useLocalStorage";
import { conVal } from "../Helper/Helper";
import { Container, Row, Col } from "reactstrap";
import Image from "react-bootstrap/Image";
import SubInputAdornment from "../SubComponent/SubInputAdornment";
import Button from "@material-ui/core/Button";
import loginImg from "../../../images/LoginPage.png";
import otpImg from "../../../assets/Mobile-OTP.svg";
import mobileImg from "../../../assets/mobile.svg";
import ReferalImg from "../../../assets/Referral Code grey.svg";
import { useHistory } from "react-router-dom";
import { getLocation } from "../Helper/Helper";
function VerifyContact() {
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [generateOtp, setgenerateOtp] = useState("");
  const [otpTime, setotpTime] = useState("60");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [Token, setToken] = useState("");
  const [userToken, setUserToken] = useLocalStorage("user-token", "");
  let history = useHistory();
  const [errorMsg, seterrorMsg] = useState({
    errorOBJ: {
      errorOTP: "",
    },
  });
  useEffect(() => {
    $("#resend").hide();
    $("#countdown").hide();
  }, []);

  // for OTP TIMER
  useEffect(() => {
    if (otpTime === 0) {
      $("#resend").show();
      $("#countdown").hide();
    } else {
      $("#resend").hide();
    }
  }, [otpTime]);
  //  mobile No checking
  useEffect(() => {
    if (contact.length === 10) {
      getLocation();
      setBtnDisabled(false);
      smsVerify();
      return;
    }
  }, [contact]);

  const handleChange = (e) => {
    e.preventDefault();
    conVal();
    setContact(e.target.value);
  };
  const GoTo = (e) => {
    e.preventDefault();
    if (otp.length === 4) {
      if (otp == generateOtp.otp) {
        console.log("OTP VERIFIED");
        history.push("/Email");
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
  };
  const smsVerify = async () => {
    // e.preventDefault();
    try {
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
      myHeaders.append(
        "Cookie",
        ".AspNetCore.Session=CfDJ8CvWZjij8S1Gs%2F47xWKSoRJZs%2BWayJIk%2BOKlmtMILcJ1CkSZQ922QO4qMpd95j3uoVCNEH8rPnZl6Flo%2BOdBbH5F5j16MORHEWEUKYuw7ySAHCbUKki8YSan42Pl8dThGPCB4tk0VuaXsiJa0SLvMxqPdSDGOq9x1kRSOrbbqfxa"
      );

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `${SERVER_ID}/api/MobileAuthentication/Send_OTP?mobileNo=${contact}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setgenerateOtp(result))
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
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col className="mt-2" md="7">
            <Image className="login-img-res" src={loginImg} fluid />
          </Col>
          <Col md="3" className=" div-center">
            <form className="form-verify">
              <h3 className="float-left">Registration</h3>
              <br />
              <hr className=" hr-verify color-gradiant" />
              <p className="float-left font-weight-bold">
                Already have account? Signin
              </p>
              <br />
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
                      <SubInputAdornment
                        Dataicon={
                          <Image
                            className="login-img-res"
                            src={mobileImg}
                            fluid
                          />
                        }
                      />
                    ),
                  }}
                />
                {/* <input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
              </div>
              <div className="form-group div-otp mt-4">
                {/* <label>OTP</label> */}
                <TextField
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="form-control mt-3"
                  label="Enter OTP"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <SubInputAdornment
                        Dataicon={
                          <Image className="login-img-res" src={otpImg} fluid />
                        }
                      />
                    ),
                  }}
                />
                {/* <input type="text" value={otp} onChange={(e)=>setOtp(e.target.value)} className="form-control" placeholder="Enter password" /> */}
              </div>
              <div className="mt-4">
                {errorMsg.errorOBJ.errorOTP && (
                  <span className="text-error">
                    {errorMsg.errorOBJ.errorOTP}
                  </span>
                )}
              </div>
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
                      <SubInputAdornment
                        Dataicon={
                          <Image
                            className="login-img-res"
                            src={ReferalImg}
                            fluid
                          />
                        }
                      />
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
                  //
                >
                  {/* Resend via <Button onClick={smsVerify}> sms.</Button> */}
                </p>
              </div>
              <div className="btn-class-submit mt-4">
                {}{" "}
                <Button
                  disabled={btnDisabled}
                  type="submit"
                  fullWidth="true"
                  onClick={GoTo}
                  className="btn font-weight-bold color-gradiant form-control text-white border-0 btn-block btn-comman btn-otp"
                >
                  Proceed
                </Button>
              </div>
              <br />
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default VerifyContact;
