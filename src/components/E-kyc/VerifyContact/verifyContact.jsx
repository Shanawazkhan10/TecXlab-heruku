import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import $ from "jquery";
import "./verifyContact.css";
import SERVER_ID from "../Configure/configure";
import { useLocalStorage } from "../CustomHooks/useLocalStorage";
import { conVal } from "../Helper/Helper";
import { Container, Row, Col } from 'reactstrap'
import Image from 'react-bootstrap/Image'
import SubInputAdornment from '../SubComponent/SubInputAdornment'
import Button from '@material-ui/core/Button';
function VerifyContact() {
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [generateOtp, setgenerateOtp] = useState("");
  const [otpTime, setotpTime] = useState("60");
  const [Token, setToken] = useState("");
  const [userToken, setUserToken] = useLocalStorage("user-token", "");

  const [errorMsg, seterrorMsg] = useState({
    errorOBJ: {
      errorOTP: "",
    },
  });
// OTP CHECKING
  // useEffect(() => {
  //   if (otp.length === 4) {
  //     if (otp === generateOtp) {
  //       console.log("OTP VERIFIED")
  //       $('.btn-class-submit').show();
  //     } else {
  //       seterrorMsg((prevState) => ({
  //         ...prevState,
  //         errorOBJ: {
  //           ...prevState.errorOBJ,
  //           errorOTP: "WRONG OTP!",
  //         },
  //       }));
  //     }
  //   }
  //   if (otp.length <= 3) {
  //     seterrorMsg((prevState) => ({
  //       ...prevState,
  //       errorOBJ: {
  //         ...prevState.errorOBJ,
  //         errorOTP: "",
  //       },
  //     }));
  //   }
  // }, [otp]);
// first time page Load
  useEffect(() => {
    $("#resend").hide();
    $("#countdown").hide();
    $(".btn-class-submit").hide();
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
if(contact.length===10){
  $(".btn-class-submit").show();
  smsVerify();
}
}, [contact],)

  const handleChange = (e) => {
    e.preventDefault();
    conVal();
    setContact(e.target.value);
  };
  const GoTo =(e)=>{
    e.preventDefault();
    if (otp.length === 4) {
      if (otp === generateOtp) {
        console.log("OTP VERIFIED")
        window.location="/Email"
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


  }
  const smsVerify = async () => {
    if (contact.length === 10) {
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

  return (
    <div>
      <Container>
      <Row> 
        <Col className="mt-2" md="7">
        <Image className="login-img-res" src={require("../../../images/LoginPage.png")} fluid />
        </Col>
        <Col md="3" className=" div-center">
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
                    <SubInputAdornment Dataicon={<Image className="login-img-res" src={require("../../../assets/mobile.svg")} fluid />}/>
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
                    <SubInputAdornment Dataicon={<Image className="login-img-res" src={require("../../../assets/Mobile-OTP.svg")} fluid />}/>
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
                    <SubInputAdornment Dataicon={<Image className="login-img-res" src={require("../../../assets/Referral Code grey.svg")} fluid />}/>
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
            <div className="btn-class-submit">
              <Button
                type="submit"
                fullWidth="true"
                onClick={GoTo}
                className="btn font-weight-bold color-gradiant form-control text-white border-0 btn-block btn-comman btn-otp"
              >
                Proceed
              </Button>
            </div>
            <br/>
          </form>
        </Col>
      </Row> 
      </Container>

    </div>
  );
}
export default VerifyContact;
