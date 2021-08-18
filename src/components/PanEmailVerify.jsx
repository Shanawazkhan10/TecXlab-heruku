import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import $ from "jquery";
import axios from "axios";
import SERVER_ID from "../configure";
// import panVerify from "./index";
import { Alert } from "bootstrap";
// import "./verifyContact.css"

function PanEmailVerify() {
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [otp, setOtp] = useState("");
  const [panres, setPenRes] = useState("");
  const [bank, setbank] = useState("");
  const [ifsc, setifsc] = useState("");
  const [submitB, setSubmitB] = useState("Verify PAN");
  const [apiURL, setApiURL] = useState("/api/Notify/PanAPITest");
  const [apiURLBank, setApiURLBank] = useState("/api/Notify/BankVerify");
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
    if (ifsc.length >= 5 && bank !== "") {
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
        SERVER_ID +
          "/VerifyBankAccount?beneficiary_account_no=" +
          bank +
          "&beneficiary_ifsc=" +
          ifsc +
          "",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          result.verified !== true
            ? alert("failed")
            : (window.location.href = "/RazorPay");
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
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Verify Pan</h3>

            <div className="form-group">
              {/* <label>Enter Contact</label> */}
              <TextField
                type="text"
                id="fieldSelectorId"
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
            <div className="form-group">
              {/* <label>Enter Contact</label> */}
              <TextField
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="form-control"
                label="Enter DOB"
              />
              {/* <input type="text" value={contact} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
            </div>

            <div className="div_bank">
              <div className="form-group">
                {/* <label>Enter Contact</label> */}
                <TextField
                  type="number"
                  value={bank}
                  onChange={(e) => setbank(e.target.value)}
                  className="form-control"
                  label="BANK ACCOUNT NO."
                />
                {/* <input type="text" value={contact} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
              </div>
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

            <div className="btn-class-submit">
              <button
                type="submit"
                onClick={getVerify}
                className="btn btn-primary btn-block btn-otp"
              >
                {submitB}
              </button>
              <button
                type="submit"
                onClick={bankVerify}
                className="btn btn-primary btn-block btn-bank"
              >
                BANK VERIFYs
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
