import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import $ from 'jquery';
import './verifyContact.css';
import SERVER_ID from '../Configure/configure';
import { useLocalStorage } from '../CustomHooks/useLocalStorage';
import { conVal } from '../Helper/Helper';
import { Container, Row, Col } from 'reactstrap';
import Image from 'react-bootstrap/Image';
import SubInputAdornment from '../SubComponent/SubInputAdornment';
import Button from '@material-ui/core/Button';
import loginImg from '../../../images/LoginPage.png';
import otpImg from '../../../assets/Mobile-OTP.svg';
import mobileImg from '../../../assets/mobile.svg';
import ReferalImg from '../../../assets/Referral Code grey.svg';
import { useHistory } from 'react-router-dom';
import { getLocation } from '../Helper/Helper';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { FormControlLabel, Checkbox } from '@material-ui/core';

import axios from 'axios';
function VerifyContact() {
  const [contact, setContact] = useState('+91');
  const [otp, setOtp] = useState('');
  const [generateOtp, setgenerateOtp] = useState('');
  const [otpTime, setotpTime] = useState('60');
  const [countResend, setCountResend] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [MobileDisable, setMobileDisable] = useState(false);
  const [userToken, setUserToken] = useLocalStorage('user-token', '');
  const [modalStyle] = React.useState(getModalStyle);
  const [visible, SetVisible] = useState(false);

  let history = useHistory();
  const [errorMsg, seterrorMsg] = useState({
    errorOBJ: {
      errorOTP: '',
    },
  });
  useEffect(() => {
    $('#countdown').hide();
    $('.class-referal').hide();
    $('.link-resend').hide();
  }, []);

  // for OTP TIMER
  useEffect(() => {
    if (otpTime === 0) {
      $('#countdown').hide();
    } else {
    }
  }, [otpTime]);
  //  mobile No checking
  useEffect(() => {
    if (contact.length === 10) {
      $('.link-resend').show();
      getLocation();
      // getReverseGeocodingData();
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
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
          mobile_No: contact,
          otp: otp,
          method_Name: 'Check_OTP',
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        fetch(`${SERVER_ID}/api/lead/Verify_OTP`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            // console.log(result);
            localStorage.setItem(
              'userToken',
              result.res_Output[0].result_Description
            );
            if (result.res_Output[0].result_Id === 1) {
              localStorage.setItem('userInfo', contact);
              console.log('OTP VERIFIED');
              history.push('/Email');
            } else {
              seterrorMsg((prevState) => ({
                ...prevState,
                errorOBJ: {
                  ...prevState.errorOBJ,
                  errorOTP: 'WRONG OTP!',
                },
              }));
            }
          })
          .catch((error) => console.log('error', error));
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
          errorOTP: '',
        },
      }));
    }
  };
  const smsVerify = async () => {
    // e.preventDefault();
    $('.btn-submit').show();
    $('#countdown').show();
    $('#resend').hide();

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      mobile_No: contact,
      method_Name: 'Check_Mobile_No',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${SERVER_ID}/api/lead/Read_Lead`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setgenerateOtp(result.res_Output[0].result_Extra_Key);
        // console.log(result);
      })
      .catch((error) => console.log('error', error));
  };
  const contactBlock = () => {
    setotpTime('');
    smsVerify();
    setCountResend(countResend + 1);
  };
  useEffect(() => {
    if (countResend >= 4) {
      setMobileDisable(true);
      $('.link-resend').hide();
    }
  }, [countResend]);
  const referalFun = () => {
    $('.class-referal').show();
  };
  const handleOpenModal = () => {
    SetVisible(true);
  };

  const handleCloseModal = () => {
    SetVisible(false);
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '#000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const Body = (
    <div style={modalStyle} className={classes.paper}>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <p>
          <b style={{ marginLeft: '12px' }}>Terms and Condition</b>
        </p>
        <CloseRoundedIcon
          onClick={handleCloseModal}
          style={{ marginRight: '12px', cursor: 'pointer' }}
        />
      </Row>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat minima
        fuga quod at modi excepturi a quos laborum iure possimus vel, similique
        nisi, tenetur explicabo iste deleniti nostrum neque nam. Lorem, ipsum
        dolor sit amet consectetur adipisicing elit. Sapiente, exercitationem.
        Quisquam, sunt laboriosam iste minima ipsa, sit delectus maiores porro
        fugit nesciunt amet sint repellendus ullam quibusdam! Amet, dolores
        aspernatur! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Itaque voluptatem, possimus, incidunt veniam aliquam nobis unde placeat
        consequuntur ex illo laboriosam cumque! Et perferendis quisquam expedita
        accusantium ipsam enim impedit!
      </p>
      <div>
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="I agree terms and conditions"
        />
      </div>
      <Button
        fullWidth="true"
        type="submit"
        onClick={handleCloseModal}
        className="btn-comman text-white"
      >
        Proceed
      </Button>
    </div>
  );

  return (
    <div>
      <Modal
        open={visible}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {Body}
      </Modal>
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
                <TextField
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
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
            <Row className="mt-2">
              <Col className="" sm="12" md="8">
                <small>
                  {/* <span> Do you have a </span> */}
                  <span
                    onClick={contactBlock}
                    className="link-comman link-resend"
                  >
                    Resend Code?{' '}
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
                    Referal Code?{' '}
                  </span>
                </small>
                <br />
                <small>
                  <span> By clicking on procees agree to all the </span>
                  <span className="link-comman" onClick={handleOpenModal}>
                    Term & Condition{' '}
                  </span>
                </small>
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
                  onClick={GoTo}
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
