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
import BackDrop from "../SubComponent/BackDrop";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router";
// import { IfscValidator } from "../Helper/Helper";
function PanBankEmail() {
  const history = useHistory();
  const [open, setOpen] = useState("");
  const [openIfsc, setOpenIfsc] = useState("");
  const [IfscResponse, setIfscResponse] = useState("");
  const [emailResponse, setemailResponse] = useState("");
  const [BackDropOption, setBackDropOption] = useState(false);
  // const [BackDropTrue, setBackDropTrue] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    otp: "",
    pan: "",
    dob: "",
    AcNo: "",
    ifsc: "",
    address: "",
  });
  useEffect(() => {
    // console.log("runnin.....");
    if (emailResponse !== "") {
      setBackDropOption(false);
    }
  }, [emailResponse]);
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
  // const openIfscModal = () => {
  //   setOpenIfsc(true);
  // };

  const handleIfscClose = () => {
    setOpenIfsc(false);
  };

  const handleBlur = async () => {
    console.log("blur happed");
    const ifscCode = inputs.ifsc;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `https://ifsc.razorpay.com/${ifscCode}`,
      requestOptions
    );
    // .then((response) => response.json())
    // .then((result) => setIfscc(result))
    // .catch((error) => console.log("error", error));
    const getIfscData = await response.json();
    setIfscResponse(getIfscData);
    console.log(IfscResponse);
    setOpenIfsc(true);
  };
  const handleEmailBlur = () => {
    const EmailToValidate = inputs.email;
    if (EmailToValidate === "") {
      return;
    }
    setBackDropOption(true);
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(
      `https://api.email-validator.net/api/verify?EmailAddress=${EmailToValidate}&APIKey=ev-46e887f0634a578dc7d95bdc76b66e08`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setemailResponse(result);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      {/* modal */}
      {/* <div> */}
      {/* <Container> */}
      <BackDrop data={BackDropOption} />
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
      {/* dialog for IFSC CHECK */}
      <Dialog
        maxWidth="xs"
        open={openIfsc}
        onClose={handleIfscClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <Row>
            <Col md="10">
              <span>Confirm Bank Details</span>
            </Col>
            <Col md="2">
              <CloseIcon className="close" onClick={handleIfscClose} />
            </Col>
          </Row>

          <Row>
            <Col>
              <p>
                <span> IFSC Code: </span> {IfscResponse.IFSC}
                <br />
                <span> Bank Name:</span> {IfscResponse.BANK}
                <br />
                <span> Address:</span> {IfscResponse.ADDRESS}
              </p>
            </Col>
          </Row>

          <Row>
            <Col className="mt-3">
              <Button
                fullWidth="true"
                type="submit"
                onClick={consoleData}
                className="btn-comman text-white"
              >
                Confirm
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className="mt-3">
              <Button
                fullWidth="true"
                type="submit"
                onClick={handleIfscClose}
                className="btn-comman text-white"
              >
                cancel
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
                  onBlur={handleEmailBlur}
                  className="form-control"
                  label="Enter Email ID"
                />
              </Col>
            </Row>
            <Row>
              <Col className="" sm="12" md="8">
                {/* <div> */}

                {emailResponse !== "" &&
                  (emailResponse.status !== 200 ? (
                    <div>
                      {" "}
                      <br />
                      <span className="error-email">
                        please provide valid email
                      </span>
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <br />
                      <span className="error-email">valid email</span>
                    </div>
                  ))}
                {/* </div> */}
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
                  inputProps={{ style: { textTransform: "uppercase" } }}
                  variant="outlined"
                  autoComplete="off"
                  name="ifsc"
                  value={inputs.ifsc}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="form-control"
                  label="Enter IFSC Code"
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm="12" md="8" className="margin-pan">
                {" "}
                <small>
                  {" "}
                  <p
                    // className=""
                    className="link-comman modal_open"
                    onClick={openModal}
                  >
                    <SearchIcon fontSize="small" /> Find Your IFSC Code
                  </p>
                </small>
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
              {/* <Col md="3">{Ifscc && <p>{Ifscc.ADDRESS}</p>}</Col> */}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default PanBankEmail;
