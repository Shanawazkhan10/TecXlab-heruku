import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import $ from "jquery";
import SERVER_ID from "../configure";
import { Container, Row, Col } from 'reactstrap'
// import React from 'react';
import Button from '@material-ui/core/Button';
import "./PanEmailVerify.css"
function PanEmailVerify() {
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [otp, setOtp] = useState("");
  const [ifsc, setifsc] = useState("");
  const [submitB, setSubmitB] = useState("Verify PAN");
  const [IFSCData, setIFSCData] = useState("");
  useEffect(() => {
    // loadDataOnlyOnce();
    $(".div-otp").hide();
    $(".btn-submit").hide();
    $(".div_bank").hide();
    $(".btn-bank").hide();
    setEmail("");
    setOtp("");
  }, []);

  const getVerify = async (e) => {
    e.preventDefault();
    if (pan.length == 10 && name !== "" && dob !== "") {
      const book = {
        pan_no: pan,
        full_name: name,
        date_of_birth: dob,
      };

      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
        SERVER_ID +
          "/PanAuthentication?pan_no=" +
          pan +
          "&full_name=" +
          name +
          "&date_of_birth=" +
          dob +
          "",
        requestOptions
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          response.name_matched === true && response.is_pan_dob_valid === true
            ? $(".div_bank").show() &&
              $(".btn-otp").hide() &&
              $(".btn-bank").show()
            : $(".div_bank").hide();
        })
        .catch((error) => console.log("error", error));
    }
  };
  const bankVerify = async (e) => {
    e.preventDefault();
    if (ifsc.length >= 5) {
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
        "https://localhost:5001/IFSCCheck?IFSC_code=" + ifsc + "",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
        console.log(result)
        result && setIFSCData(result)
        console.log(IFSCData)
        })
        .catch((error) => console.log("error", error));
    }
  };

  const getSubmit = (e) => {
    e.preventDefault();
    if (email !== "" && otp !== "") {
      window.location.href = "/verifyPin";
      // return
    }
  };

  $("#fieldSelectorId").keypress(function (e) {
    var length = $(this).val().length;
    if (length > 9) {
      return false;
    }
  });

  return (
    <div>
      <Container>
        <Row>
          <Col md="6">image</Col>
          <Col md="6" className="div-PanEmail">
          <Row>
            <Col>
            <h3 className="float-left">Let's get started
            </h3>     
            <br/> 
            <hr className="hr-personal color-gradiant"/>
            </Col>
          </Row>
          <Row>
            <Col className="" sm="12" md="6" className="margin-pan">
            <TextField
                type="text"
                className="margin-pan"
                 variant="outlined"
                value={pan}
                // onChange={(e) => {
                //   let cData = e.target.value.toUpperCase();
                //   setPan(cData);
                // }}
                className="form-control"
                label="Enter Email ID"
              />
            </Col>
            <Col className="mt-3" sm="12" md="6" className="margin-pan" >
            <TextField
                type="text"
                 variant="outlined"
                // value={pan}
                // onChange={(e) => {
                //   let cData = e.target.value.toUpperCase();
                //   setPan(cData);
                // }}
                className="form-control"
                label="Enter OTP sent on mail"
              />
            </Col>
            </Row>
          <Row className="mt-2">
            <Col className="mt-3" sm="12" md="6" className="margin-pan">  <TextField
                type="text"
                 variant="outlined"
                // value={pan}
                // onChange={(e) => {
                //   let cData = e.target.value.toUpperCase();
                //   setPan(cData);
                // }}
                className="form-control"
                label="Enter PAN Number"
              /></Col>
            <Col className="mt-3" sm="12" md="6" className="margin-pan">  <TextField
                type="date"
                 id="outlined-basic" variant="outlined"
                // value={pan}
                // onChange={(e) => {
                //   let cData = e.target.value.toUpperCase();
                //   setPan(cData);
                // }}
                className="form-control"
                // label="Enter DOB"
              /></Col>
            </Row>
          <Row className="mt-2">
            <Col className="mt-3" sm="12" md="6" className="margin-pan">  <TextField
                type="text"
                 variant="outlined"
                // value={pan}
                // onChange={(e) => {
                //   let cData = e.target.value.toUpperCase();
                //   setPan(cData);
                // }}
                className="form-control"
                label="Enter Bank A/C Number"
              /></Col>
            <Col className="mt-3" sm="12" md="6" className="margin-pan">  <TextField
                type="text"
                 variant="outlined"
                value={pan}
                onChange={(e) => {
                  let cData = e.target.value.toUpperCase();
                  setPan(cData);
                }}
                className="form-control"
                label="Enter IFSC Code"
              /></Col>
            </Row>
            <br/>
            <br/>
            <Row>
       <Col md="3"></Col>
       <Col md="6">
        <Button
        fullWidth="true"
                type="submit"
                // onClick={smsVerify}
                className="btn-comman text-white"
              >
                Proceed
              </Button>
              </Col>
              <Col md="3"></Col>
        </Row>
          </Col>
          
        </Row>
      </Container>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Verify Pan</h3>

            <div className="form-group">
              {/* <label>Enter Contact</label> */}
              <TextField
                type="text"
                id="fieldSelectorI"
                value={pan}
                onChange={(e) => {
                  let cData = e.target.value.toUpperCase();
                  setPan(cData);
                }}
                className="form-control"
                label="Enter PAN NO"
              />
              {/* <input type="text" value={contact} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
            </div>
            <div className="form-group">
              {/* <label>Enter Contact</label> */}
              <TextField
                autoComplete="off"
                type="text"
                value={name}
                onChange={(e) => {
                  let cData = e.target.value.toUpperCase();
                  setName(cData);
                }}
                className="form-control"
                label="Enter NAME"
              />
              {/* <input type="text" value={contact} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
            </div>
            <br />
            <div className="form-group">
              {/* <label>Enter Contact</label> */}
              <TextField
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="form-control"
                // label="Enter DOB"
              />
              {/* <input type="text" value={contact} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
            </div>

            <div className="div_bank">
              {/* <div className="form-group">
                <TextField
                  type="number"
                  value={bank}
                  onChange={(e) => setbank(e.target.value)}
                  className="form-control"
                  label="BANK ACCOUNT NO."
                />
              </div> */}
             
              <div className="form-group">
                {/* <label>Enter Contact</label> */}
                <TextField
                  type="text"
                  value={ifsc}
                  onChange={(e) => {
                    let cData = e.target.value.toUpperCase();
                    setifsc(cData);
                  }}
                  className="form-control"
                  label="BANK IFSC"
                />
                {/* <input type="text" value={contact} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
              </div>
            </div>
<div>
{
  IFSCData ?(<div><p>
              YOUR IFCS CODE : {IFSCData.IFSC}<br/>
              YOUR BANK CODE :  {IFSCData.CITY}<br/>
              YOUR BRANCH CODE :  {IFSCData.BRANCH}<br/>
  </p>
</div>
  ):("")
}
</div>
            <div className="btn-class-submit">
              <button
                type="submit"
                onClick={getVerify}
                className="btn btn-primary btn-block btn-otp"
              >
                {submitB}
              </button>
              
              {/* <button type="submit" onClick={getSubmit} className="btn btn-primary btn-block btn-submit">Submit</button> */}
              {/* <a href="https://services.digitallocker.gov.in/savelocker/api/1/savelocker.js" type="submit" className="btn btn-primary btn-block">Connect to Digilocker</a> */}
              {/* <button type="submit" onClick={fetchData} className="btn btn-primary btn-block">Fetch API</button> */}
            </div>
            {/* <p className="forgot-password text-right">
              Email <Link to="/EmailTemplate">verify?</Link>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  );
}
export default PanEmailVerify;
