import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import $ from "jquery";
import "./verifyContact.css";
import SERVER_ID from "../Configure/configure";
import { Container, Row, Col } from "reactstrap";
import Image from "react-bootstrap/Image";
import SubInputAdornment from "../SubComponent/SubInputAdornment";
import Button from "@material-ui/core/Button";
import loginImg from "../../../images/LoginPage.png";
import otpImg from "../../../assets/Mobile-OTP.svg";
import mobileImg from "../../../assets/mobile.svg";
import ReferalImg from "../../../assets/Referral Code grey.svg";
import { useHistory } from "react-router-dom";
import { getLocation, conVal, mobileOtp, ORG_ID } from "../Helper/Helper";
import InputAdornment from "@material-ui/core/InputAdornment";
// import AccountCircle from '@material-ui/icons/AccountCircle';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import ORG_ID from "."
function VerifyContact() {
  const [contact, setContact] = useState("+91");
  const [otp, setOtp] = useState("");
  const [generateOtp, setgenerateOtp] = useState("");
  const [otpTime, setotpTime] = useState("60");
  const [countResend, setCountResend] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [MobileDisable, setMobileDisable] = useState(false);
  const [ButtonChecked, setButtonChecked] = useState("");
  const [Disabled, setDisabled] = useState(true);
  // const [userToken, setUserToken] = useLocalStorage('user-token', '');
  //T&C hooks
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const [Location, setLocation] = useState("");
  let history = useHistory();
  const [errorMsg, seterrorMsg] = useState({
    errorOBJ: {
      errorOTP: "",
      errorNumber: "",
    },
  });
  useEffect(() => {
    console.log(ORG_ID);
    $("#countdown").hide();
    $(".class-referal").hide();
    $(".link-resend").hide();
  }, []);

  // for OTP TIMER
  useEffect(() => {
    if (otpTime === 0) {
      $("#countdown").hide();
    } else {
    }
  }, [otpTime]);
  useEffect(() => {
    if (otp.length < 6) {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorOTP: "",
        },
      }));
    }
  }, [otp]);
  // error msg for contact
  const handleContactBlur = () => {
    if (contact.length !== 10) {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorNumber: "Enter Valid Contact",
        },
      }));
    }
  };
  //  mobile No checking
  useEffect(() => {
    if (contact.length === 10) {
      $(".link-resend").show();
      getLocation(function (data) {
        setLocation(data);
        setDisabled(false);
        // console.log("data from child:", data);
      });

      smsVerify();
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorNumber: "",
        },
      }));
      return;
    }

    if (contact.length !== 10) {
      setDisabled(true);
    }
  }, [contact]);
  useEffect(() => {
    if (contact.length === 10 && ButtonChecked === true) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [contact, ButtonChecked]);
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleChange = async (e) => {
    e.preventDefault();
    conVal();
    setContact(e.target.value);
  };
  const handleProceed = async (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          mobile_No: contact,
          otp: otp,
          method_Name: "Check_OTP",
          org_Id: ORG_ID,
          flow_Id: "m001001",
          current_Stage_Id: "c002001",
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${SERVER_ID}/api/lead/Verify_OTP`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            // console.log(result);
            localStorage.setItem(
              "userToken",
              result.res_Output[0].result_Description
            );
            if (result.res_Output[0].result_Id === 1) {
              const stage_ID = result.res_Output[0].result_Extra_Key;
              localStorage.setItem("userInfo", contact);
              localStorage.setItem("Staged_ID", stage_ID);

              // console.log("OTP VERIFIED");
              // work with your data came from server
              var myHeaders = new Headers();
              myHeaders.append(
                "Authorization",
                `Bearer ${localStorage.getItem("userToken")}`
              );
              myHeaders.append("Content-Type", "application/json");
              const lat = Location.latitude.toString();
              const long = Location.longitude.toString();

              var raw = JSON.stringify({
                mobile_No: contact,
                ip: Location.IPv4,
                city: Location.city,
                country: Location.country_name,
                state: Location.state,
                latitude: lat,
                longitude: long,
              });

              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };

              fetch(`${SERVER_ID}/api/lead/Lead_Location`, requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log("error", error));
              // staged ID
              if (result.res_Output[0].result_Extra_Key !== "") {
                history.push(result.res_Output[0].result_Extra_Key);
              }
              // history.push()
              // switch (stage_ID) {
              //   case "1":
              //     history.push("/Email");
              //     break;
              //   case "2":
              //     history.push("/AccountOpen");
              //     break;
              //   case "3":
              //     history.push("/AdhaarKYC");
              //     break;
              //   case "4":
              //     history.push("/PersonalInfo");
              //     break;
              //   case "5":
              //     history.push("/IPVerification");
              //     break;
              //   case "6":
              //     history.push("/UploadUi");
              //     break;
              //   case "7":
              //     history.push("/LastStep");
              //     break;
              //   case "8":
              //     history.push("/FnoNominee");
              //     break;

              //   default:
              //     history.push("/Email");
              //     break;
              // }
              // history.push("/Email");
            } else {
              seterrorMsg((prevState) => ({
                ...prevState,
                errorOBJ: {
                  ...prevState.errorOBJ,
                  errorOTP: "WRONG OTP!",
                },
              }));
            }
          })
          .catch((error) => console.log("error", error));
      } catch (err) {
        // catches errors both in fetch and response.json
        alert(err);
      }

      // if (otp === generateOtp) {
      //   console.log("OTP VERIFIED");
      //   // history.push("/Email");
      // } else {
      //   seterrorMsg((prevState) => ({
      //     ...prevState,
      //     errorOBJ: {
      //       ...prevState.errorOBJ,
      //       errorOTP: "WRONG OTP!",
      //     },
      //   }));
      // }
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
    $(".btn-submit").show();
    $("#countdown").show();
    $("#resend").hide();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      mobile_No: contact,
      method_Name: "Check_Mobile_No",
      org_Id: ORG_ID,
      flow_Id: "M001001",
      current_Stage_Id: "C002001",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${SERVER_ID}/api/lead/Read_Lead`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setgenerateOtp(result.res_Output[0].result_Extra_Key);
        // console.log(result);
      })
      .catch((error) => console.log("error", error));
  };
  const contactBlock = () => {
    setotpTime("");
    smsVerify();
    setCountResend(countResend + 1);
  };
  useEffect(() => {
    if (countResend >= 4) {
      setMobileDisable(true);
      $(".link-resend").hide();
    }
  }, [countResend]);
  const referalFun = () => {
    $(".class-referal").show();
  };
  const OtpValidator = (e) => {
    e.preventDefault();
    mobileOtp();
    setOtp(e.target.value);
  };

  return (
    <div>
      <div>
        {/* <Button onClick={handleClickOpen('paper')}>scroll=paper</Button> */}
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Terms & conditions</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              {/* {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join('\n')} */}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Reiciendis minus, at, distinctio quas aliquam sunt sint soluta
              accusamus odio ratione cupiditate architecto hic? Libero rem sunt,
              quas necessitatibus quo doloribus? Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Reiciendis minus, at, distinctio
              quas aliquam sunt sint soluta accusamus odio ratione cupiditate
              architecto hic? Libero rem sunt, quas necessitatibus quo
              doloribus? Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Reiciendis minus, at, distinctio quas aliquam sunt sint
              soluta accusamus odio ratione cupiditate architecto hic? Libero
              rem sunt, quas necessitatibus quo doloribus? Lorem ipsum dolor,
              sit amet consectetur adipisicing elit. Reiciendis minus, at,
              distinctio quas aliquam sunt sint soluta accusamus odio ratione
              cupiditate architecto hic? Libero rem sunt, quas necessitatibus
              quo doloribus? Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Reiciendis minus, at, distinctio quas aliquam sunt sint
              soluta accusamus odio ratione cupiditate architecto hic? Libero
              rem sunt, quas necessitatibus quo doloribus? Lorem ipsum dolor,
              sit amet consectetur adipisicing elit. Reiciendis minus, at,
              distinctio quas aliquam sunt sint soluta accusamus odio ratione
              cupiditate architecto hic? Libero rem sunt, quas necessitatibus
              quo doloribus? Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Reiciendis minus, at, distinctio quas aliquam sunt sint
              soluta accusamus odio ratione cupiditate architecto hic? Libero
              rem sunt, quas necessitatibus quo doloribus?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className="mr-3" onClick={handleClose}>
              Proceed
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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
                  error={errorMsg.errorOBJ.errorNumber ? true : false}
                  id="fieldSelectorNo"
                  pattern="[1-9]{1}[0-9]{9}"
                  value={contact}
                  disabled={MobileDisable}
                  onChange={handleChange}
                  onBlur={handleContactBlur}
                  className="form-control"
                  label="Enter Contact"
                  variant="outlined"
                  // InputProps={{}}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {/* <AccountCircle /> */}
                        +91
                      </InputAdornment>
                    ),
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
                <br />
                <br />
                {errorMsg.errorOBJ.errorNumber && (
                  <div className="div-error-contact">
                    <span className="error-contact">
                      {errorMsg.errorOBJ.errorNumber}
                    </span>
                  </div>
                )}
                <TextField
                  error={errorMsg.errorOBJ.errorOTP ? true : false}
                  value={otp}
                  type="number"
                  id="mobileOtp"
                  disabled={Disabled}
                  onChange={OtpValidator}
                  className="form-control"
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
              <div>
                {
                  <div className="error-div-contact">
                    {/* <br /> */}
                    <span className="error-contact">
                      {errorMsg.errorOBJ.errorOTP}
                    </span>
                  </div>
                }
              </div>
              {/* </Col> */}
            </Row>
            <Row>
              <Col className="" sm="12" md="8">
                <small>
                  {/* <span> Do you have a </span> */}
                  <span
                    onClick={contactBlock}
                    className="link-comman link-resend"
                  >
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
                  className="form-control mt-3 class-referal"
                  label="Referral Code (Optional)"
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
                    Referral Code?{" "}
                  </span>
                </small>
                <br />

                {/* <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="checkedI"
                  /> */}
                <div
                  className="mt-2"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    className="mr-2"
                    type="checkbox"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => setButtonChecked(e.target.checked)}
                  />
                  <small>
                    <span>
                      I agree to the{" "}
                      <span
                        className="link-comman"
                        onClick={handleClickOpen("paper")}
                      >
                        Terms & Conditions{" "}
                      </span>
                    </span>
                  </small>
                </div>
              </Col>
            </Row>
            {/* <Row>
              <Col className="" sm="12" md="8">
                <div className="form-group otp-time">
                  <p id="countdown" style={{ textAlign: "center" }}>
                    Resend Link in {otpTime} sec.
                  </p>
                </div>
              </Col>
            </Row> */}
            <br />
            <Row>
              <Col className="" sm="12" md="8">
                <Button
                  disabled={btnDisabled}
                  type="submit"
                  // fullWidth="true"
                  onClick={handleProceed}
                  className="btn font-weight-bold color-gradiant form-control text-white border-0 btn-block"
                >
                  Proceed
                </Button>
              </Col>
            </Row>
            <br />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default VerifyContact;
