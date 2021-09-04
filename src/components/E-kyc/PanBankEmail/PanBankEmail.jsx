import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import $ from "jquery";
import SERVER_ID from "../Configure/configure";
import { Container, Row, Col } from "reactstrap";
import Button from "@material-ui/core/Button";
import Image from "react-bootstrap/Image";
import "./PanBankEmail.css";
import startImg from "../../../images/Get_Started_Illustration.png";
import SearchIcon from "@material-ui/icons/Search";
// import moment from 'moment';
// import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router";
function PanBankEmail() {
  const history = useHistory();
  const [open, setOpen] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    otp: "",
    pan: "",
    dob: "",
    AcNo: "",
    ifsc: "",
  });
  const handleInputChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInputs((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };
  const consoleData = () => {
    history.push("/personalInfo");
    console.log(inputs);
  };
  const EmailValidator = (vals) => {
    const errors = {};
    if (!vals.email) {
      errors.email = "Required";
    }
  };

  $("#input_capital").keyup(function (e) {
    var str = $(this).val();
    $("#input_capital").val(str.toUpperCase());
  });
  // modal function
  // const openModal = () => {};
  const openModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {/* modal */}
      {/* <div> */}
      {/* <Container> */}
      <Dialog
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <Row>
            <Col md="10">
              <span>Find your IFSC Code</span>
            </Col>
            <Col md="2">
              <CloseIcon className="close" onClick={handleClose} />
            </Col>
          </Row>
          <TextField
            variant="outlined"
            autoFocus
            margin="dense"
            id="name"
            label="Enter IFSC Code"
            type="email"
            fullWidth
          />

          <Row>
            <Col className="text-center">
              {" "}
              <span align="center">Or</span>
            </Col>
          </Row>

          <TextField
            variant="outlined"
            // autoFocus
            margin="dense"
            id="name"
            label="Enter Bank Name"
            type="email"
            fullWidth
          />

          <TextField
            variant="outlined"
            // autoFocus
            margin="dense"
            // id="name"Enter Branch Location
            label="Enter Branch Location"
            type="email"
            fullWidth
          />
          <Row>
            <Col className="mt-3">
              <Button
                fullWidth="true"
                type="submit"
                onClick={consoleData}
                className="btn-comman text-white"
              >
                Search
              </Button>
            </Col>
          </Row>
        </DialogContent>
        <br />
      </Dialog>
      {/* </Container> */}
      {/* modal */}
      <Container>
        <Row>
          <Col className="mt-5" md="7">
            <Image src={startImg} fluid />
          </Col>
          <Col md="5" className="div-PanEmail">
            <Row>
              <Col>
                <h3 className="float-left">Let's get started</h3>
                <br />
                <hr className="hr-personal color-gradiant" />
              </Col>
            </Row>
            <Row>
              <Col className="" sm="12" md="8">
                <TextField
                  type="text"
                  // className=" margin-pan"
                  variant="outlined"
                  autoComplete="off"
                  name="email"
                  defaultValue={inputs.email}
                  onChange={handleInputChange}
                  // onBlur={consoleData}
                  className="form-control"
                  label="Enter Email ID"
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col className="mt-2" sm="12" md="8" className="margin-pan">
                {" "}
                <TextField
                  type="text"
                  // id="input_capital"
                  variant="outlined"
                  autoComplete="off"
                  name="pan"
                  value={inputs.pan}
                  onChange={handleInputChange}
                  className="form-control"
                  label="Enter PAN Number"
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col className="mt-2" sm="12" md="8" className="margin-pan">
                {" "}
                <TextField
                  id="date"
                  name="dob"
                  variant="outlined"
                  label="Birthday"
                  type="date"
                  // defaultValue={moment().format("MM-DD-YYYY")}
                  className="form-control"
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col className="mt-2" sm="12" md="8" className="margin-pan">
                {" "}
                <TextField
                  type="text"
                  variant="outlined"
                  autoComplete="off"
                  name="AcNo"
                  value={inputs.AcNo}
                  onChange={handleInputChange}
                  className="form-control"
                  label="Enter Bank A/C Number"
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm="12" md="8" className="margin-pan">
                {" "}
                <TextField
                  type="text"
                  // id="input_capital"
                  variant="outlined"
                  autoComplete="off"
                  name="ifsc"
                  value={inputs.ifsc}
                  onChange={handleInputChange}
                  className="form-control"
                  label="Enter IFSC Code"
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm="12" md="8" className="margin-pan">
                {" "}
                <p className="modal_open" onClick={openModal}>
                  <SearchIcon /> Find Your IFSC Code
                </p>
              </Col>
            </Row>
            <Row>
              <Col md="8">
                <Button
                  fullWidth="true"
                  type="submit"
                  onClick={consoleData}
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
    </div>
  );
}
export default PanBankEmail;
