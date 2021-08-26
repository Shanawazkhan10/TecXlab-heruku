import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import "./allowAccess.css";
// import $ from "jquery"
// import "./verifyContact.css"

function AllowAccess() {
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");

  const getSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/verifyPin";
  };
  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Allowed access for KYC</h3>
            <div className="form-group">
              {/* <label>Enter Contact</label> */}
              {/* <TextField value={contact} onChange={(e)=>setContact(e.target.value)} className="form-control"  label="Enter Contact" /> */}
              {/* <input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Allowed Access PAN"
                    //  secondary="Jan 9, 2014"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Allowed Access AADHAR"
                    // secondary="Jan 7, 2014"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Allowed Access Personal DOC"
                    // secondary="July 20, 2014"
                  />
                </ListItem>
              </List>
            </div>

            <div className="form-group div-otp">
              <p>By allowing you can proceed futhers </p>
              {/* <label>OTP</label> */}
              {/* <TextField value={otp} onChange={(e)=>setOtp(e.target.value)} className="form-control"  label="Enter OTP" /> */}
              {/* <input type="text" value={otp} onChange={(e)=>setOtp(e.target.value)} className="form-control" placeholder="Enter password" /> */}
            </div>

            {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}
            <div className="btn-class-allow">
              {/* <button type="submit" onClick={getContact} className="btn btn-primary btn-block btn-otp">GET OTP</button> */}
              <button
                type="submit"
                onClick={getSubmit}
                className="btn  btn-submit"
              >
                DENY
              </button>
              &nbsp;&nbsp;&nbsp;
              <Link to="/" className="btn btn-primary  btn-submit">
                ALLOW
              </Link>
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
export default AllowAccess;
