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
import axios from "axios";
function VerifyContact() {
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [generateOtp, setgenerateOtp] = useState("");
  const [otpTime, setotpTime] = useState("60");
  const [countResend, setCountResend] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [MobileDisable, setMobileDisable] = useState(false);
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
    $(".class-referal").hide();
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
  const GoTo = async (e) => {
    e.preventDefault();
    if (otp.length === 4) {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          mobile_No: contact,
          method_Name: "Check_Mobile_No",
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        let response = await fetch(
          "http://localhost:44333/api/Lead/Read_Lead",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
        let user = await response.json();
      } catch (err) {
        // catches errors both in fetch and response.json
        alert(err);
      }

      if (otp === generateOtp.otp) {
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

      const mobile = "";
      var myHeaders = new Headers();
      myHeaders.append("Mobile_no", mobile);

      var formdata = new FormData();

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(
        `https://localhost:5001/api/Lead/GetLead?Mobile_no=${mobile}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    } catch (e) {
      console.log("error", e);
    }
  };
  const contactBlock = () => {
    setCountResend(countResend + 1);
  };
  useEffect(() => {
    if (countResend >= 4) {
      setMobileDisable(true);
    }
  }, [countResend]);
  const referalFun = () => {
    $(".class-referal").show();
  };
  return (
    <div>
      <Container>
        <Row>
          <Col className="mt-5" md="7">
            <Image className="login-img-res" src={loginImg} fluid />
          </Col>
          <Col className="div-PanEmail" md="5">
            <Row>
              <Col>
                <h3 className="float-left">Registration</h3>
                <br />
                <hr className="hr-personal color-gradiant" />
              </Col>
            </Row>

            <Row>
              <Col className="" sm="12" md="8">
                <p>
                  <span> Already have an account? </span>
                  <span className="link-comman">Sign in </span>
                </p>
              </Col>
            </Row>

            <Row>
              <Col className="" sm="12" md="8">
                <TextField
                  type="number"
                  id="fieldSelectorNo"
                  pattern="[1-9]{1}[0-9]{9}"
                  value={contact}
                  disabled={MobileDisable}
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
              </Col>
            </Row>
            <Row className="mt-2">
              <Col className="" sm="12" md="8">
                <TextField
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="form-control mt-3 class-referal"
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
              </Col>
            </Row>
            <Row>
              {/* <Col className="" sm="12" md="8"> */}
              {errorMsg.errorOBJ.errorOTP && (
                <div className="error-div-contact">
                  {/* <br /> */}
                  <span className="error-contact">
                    {errorMsg.errorOBJ.errorOTP}
                  </span>
                </div>
              )}
              {/* </Col> */}
            </Row>
            <Row className="mt-3">
              <Col className="" sm="12" md="8">
                <small>
                  {/* <span> Do you have a </span> */}
                  <span onClick={contactBlock} className="link-comman">
                    Resend Code?{" "}
                  </span>
                </small>
              </Col>
            </Row>
            <Row>
              <Col className="" sm="12" md="8">
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
              </Col>
            </Row>

            <Row>
              <Col sm="12" md="12">
                <br />
                <small>
                  <span> Do you have a </span>
                  <span onClick={referalFun} className="link-comman">
                    Referal Code?{" "}
                  </span>
                </small>
                <br />
                <small>
                  <span> By clicking on procees agree to all the </span>
                  <span className="link-comman">Term & Condition </span>
                </small>
              </Col>
            </Row>
            <Row>
              <Col className="" sm="12" md="8">
                <div className="form-group otp-time">
                  <p id="countdown" style={{ textAlign: "center" }}>
                    Resend Link in {otpTime} sec.
                  </p>
                  <p
                    id="resend"
                    style={{ textAlign: "center" }}
                    //
                  ></p>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md="8">
                <Button
                  disabled={btnDisabled}
                  type="submit"
                  fullWidth="true"
                  onClick={GoTo}
                  className="btn font-weight-bold color-gradiant form-control text-white border-0 btn-block btn-comman btn-otp"
                >
                  Proceed
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default VerifyContact;
