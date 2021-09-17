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
import SubInputAdornment from "../SubComponent/SubInputAdornment";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 300,
    },
  },
}));
const useStylesForList = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 200,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

// import { IfscValidator } from "../Helper/Helper";
function PanBankEmail() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openIfsc, setOpenIfsc] = useState(false);
  const [IfscResponse, setIfscResponse] = useState("");
  const [emailResponse, setemailResponse] = useState("");
  const [panResponse, setPanResponse] = useState("");
  const [BackDropOption, setBackDropOption] = useState(false);
  const [textifsc, setTextifsc] = useState(false);
  const [IFSCfromSearch, setIFSCfromSearch] = useState("");
  // const []
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  // const [BackDropTrue, setBackDropTrue] = useState(false);
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    email: "",
    otp: "",
    pan: "",
    dob: "",
    AcNo: "",
    ifsc: "",
    address: "",
  });
  // const [errorMsg, seterrorMsg] = useState({
  //   errorOBJ: {
  //     errorEmail: "",
  //     errorPan: "",
  //     error: "",
  //   },
  // });
  const [selectedDate, handleDateChange] = useState(new Date());
  const classList = useStylesForList();
  useEffect(() => {
    // console.log("runnin.....");
    if (emailResponse !== "") {
      setBackDropOption(false);
    }
  }, [emailResponse]);
  useEffect(() => {
    if (panResponse !== "") {
      setBackDropOption(false);
    }
  }, [panResponse]);
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
  const consoleData = (e) => {
    e.preventDefault();
    history.push("/AccountOpen");
    // console.log(inputs);
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
    // console.log("blur happed");
    // const ifscCode = inputs.ifsc;
    // console.log(IFSCfromSearch);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `https://ifsc.razorpay.com/${IFSCfromSearch}`,
      requestOptions
    );
    // .then((response) => response.json())
    // .then((result) => setIfscc(result))
    // .catch((error) => console.log("error", error));
    const getIfscData = await response.json();
    setIfscResponse(getIfscData);
    // console.log(IfscResponse);
    setOpenIfsc(true);
  };
  const handleEmailBlur = () => {
    const EmailToValidate = inputs.email;
    if (EmailToValidate === "") {
      return;
    }
    setBackDropOption(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    myHeaders.append("Content-Type", "application/json");
    var EmailtoValidate = inputs.email;
    var raw = JSON.stringify({
      mobile_No: localStorage.getItem("userInfo"),
      email: inputs.email,
      method_Name: "",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${SERVER_ID}/api/email/Email_Status`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setemailResponse(result);
        if (result.status === 200) {
          var myHeaders = new Headers();
          myHeaders.append(
            "Authorization",
            `Bearer ${localStorage.getItem("userToken")}`
          );
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            mobile_No: localStorage.getItem("userInfo"),
            email: EmailtoValidate,
            method_Name: "Update_Email_Status",
          });

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(`${SERVER_ID}/api/email/Update_Email`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
              // console.log(result)
            })
            .catch((error) => console.log("error", error));
        }
        // console.log(result.status);
      })
      .catch((error) => console.log("error", error));
  };
  const ifscConfirm = () => {
    setTextifsc(true);
    setOpenIfsc(false);
  };

  const handlePanBlur = () => {
    var panToValidate = inputs.pan;
    if (panToValidate === "") {
      return;
    }
    setBackDropOption(true);
    if (panToValidate !== "") {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("userToken")}`
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        pan_No: panToValidate,
        mobile_No: localStorage.getItem("userInfo"),
        method_Name: "PAN_details",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `${SERVER_ID}/api/nsdlpan/NSDLeKYCPanAuthentication`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setPanResponse(result);
          if (result.res_Output[0].result_Description === "E") {
            var PanToKra = inputs.pan;
            var myHeaders = new Headers();
            myHeaders.append(
              "Authorization",
              `Bearer ${localStorage.getItem("userToken")}`
            );
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              pan_No: PanToKra,
              method_Name: "Get_PanStatus",
            });

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            fetch(`${SERVER_ID}/api/cvlkra/Get_PanStatus`, requestOptions)
              .then((response) => response.json())
              .then((result) => {
                // console.log(result)
              })
              .catch((error) => console.log("error", error));
          }
        })
        .catch((error) => console.log("error", error));
    }
  };
  const IFSCsearch = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      bank: bankName,
      ifsc: "string",
      branch: branchName,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${SERVER_ID}/api/ifscmaster/IFSC_Master_Search`, requestOptions)
      .then((response) => response.json())
      .then((result) => setBankDetails(result.res_Output))
      .catch((error) => console.log("error", error));
  };
  const handleToggle = (value) => () => {
    // console.log(value.ifsc);
    setIFSCfromSearch(value.ifsc);
    setBankName("");
    setBranchName("");
    setOpen(false);
    setBankDetails("");
    // setChecked(newChecked);
  };
  // function renderRow(props) {
  //   const { index, style } = props;

  //   return (

  //   );
  // }
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
          <Container style={{ width: 330 }}>
            <Row>
              <Col md="10">
                <span>Find your IFSC Code</span>
              </Col>
              <Col md="2">
                <CloseIcon className="close" onClick={handleClose} />
              </Col>
            </Row>
            <Col md="12">
              <TextField
                variant="outlined"
                autoFocus
                margin="dense"
                id="name"
                label="Enter IFSC Code"
                type="email"
                // fullWidth
              />
              {/* </Col> */}
              <Row>
                <Col className="text-center">
                  {" "}
                  <span align="center">Or</span>
                </Col>
              </Row>

              <TextField
                variant="outlined"
                // autoFocus
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                margin="dense"
                id="name"
                label="Enter Bank Name"
                type="email"
                // fullWidth
              />

              <TextField
                variant="outlined"
                // autoFocus
                value={branchName}
                margin="dense"
                // id="name"Enter Branch Location
                onChange={(e) => setBranchName(e.target.value)}
                label="Enter Branch Location"
                type="email"
                // fullWidth
              />
            </Col>
            <Row>
              <Col className="mt-3">
                <Button
                  // fullWidth="true"
                  type="submit"
                  onClick={IFSCsearch}
                  className="btn-comman text-white"
                >
                  Search
                </Button>
              </Col>
              {/* <Container style={{ height: 100 }}> */}
              <Col className="mt-2">
                {bankDetails && (
                  <List className={classList.root}>
                    {bankDetails.map((value) => {
                      const labelId = `checkbox-list-label-${value}`;

                      return (
                        <ListItem
                          key={value.ifsc}
                          role={undefined}
                          dense
                          button
                          onClick={handleToggle(value)}
                        >
                          <Container>
                            <Row>
                              <Col>
                                <span>{value.branch}</span>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <span>Address :</span>{" "}
                                <small>{value.address}</small>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <span>IFSC CODE :</span>{" "}
                                <small>{value.ifsc}</small>{" "}
                              </Col>
                            </Row>
                          </Container>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </Col>
              {/* </Container> */}
            </Row>
          </Container>
        </DialogContent>
        <br />
      </Dialog>
      {/* dialog for IFSC CHECK */}
      {IfscResponse !== "Not Found" && (
        <Dialog
          maxWidth="xs"
          open={openIfsc}
          onClose={handleIfscClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <Container style={{ width: 330 }}>
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
                    // fullWidth="true"
                    type="submit"
                    onClick={ifscConfirm}
                    className="btn-comman text-white"
                  >
                    Confirm
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col className="mt-3">
                  <Button
                    // fullWidth="true"
                    type="submit"
                    onClick={handleIfscClose}
                    className="btn-comman text-white"
                  >
                    cancel
                  </Button>
                </Col>
              </Row>
            </Container>
          </DialogContent>
          <br />
        </Dialog>
      )}

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
            <form className={classes.root} noValidate autoComplete="off">
              <div>
                <TextField
                  errorhelperText="Incorrect entry."
                  id="outlined-error-helper-text"
                  autoFocus
                  variant="outlined"
                  autoComplete="off"
                  name="email"
                  defaultValue={inputs.email}
                  onChange={handleInputChange}
                  onBlur={handleEmailBlur}
                  // className="form-control"
                  label="Enter Email ID"
                />
                {emailResponse !== "" &&
                  (emailResponse.status !== 200 ? (
                    <div>
                      {" "}
                      {/* <br /> */}
                      <span className="error-email">
                        please provide valid email
                      </span>
                    </div>
                  ) : (
                    ""
                  ))}
                <TextField
                  errorhelperText="Incorrect entry."
                  id="outlined-error-helper-text"
                  type="text"
                  // id="input_capital"
                  inputProps={{
                    maxLength: 10,
                    style: { textTransform: "uppercase" },
                  }}
                  variant="outlined"
                  autoComplete="off"
                  name="pan"
                  value={inputs.pan}
                  onBlur={handlePanBlur}
                  onChange={handleInputChange}
                  // className="form-control"
                  label="Enter PAN Number"
                />
                {panResponse !== "" &&
                  (panResponse.res_Output[0].result_Description === "E" ? (
                    <div>
                      <span className="pan-error">Pan No. exist</span>
                    </div>
                  ) : (
                    <div>
                      <span className="error-email">Pan No. not exist</span>
                    </div>
                  ))}
                {/* <TextField
                  errorhelperText="Incorrect entry."
                  // id="outlined-error-helper-text"
                  id="date"
                  name="dob"
                  variant="outlined"
                  label="Birthday"
                  type="date"
                  // defaultValue={moment().format("MM-DD-YYYY")}
                  // className="form-control"
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                /> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    errorhelperText="Incorrect entry."
                    variant="inline"
                    inputVariant="outlined"
                    label="Enter DOB"
                    format="dd/MM/yyyy"
                    maxDate={new Date()}
                    value={selectedDate}
                    InputAdornmentProps={{ position: "end" }}
                    onChange={(date) => handleDateChange(date)}
                  />
                </MuiPickersUtilsProvider>
                <TextField
                  errorhelperText="Incorrect entry."
                  id="outlined-error-helper-text"
                  type="text"
                  variant="outlined"
                  autoComplete="off"
                  name="AcNo"
                  value={inputs.AcNo}
                  onChange={handleInputChange}
                  // className="form-control"
                  label="Enter Bank A/C Number"
                  inputProps={{
                    maxLength: 18,
                    style: { textTransform: "uppercase" },
                  }}
                />
                <TextField
                  errorhelperText="Incorrect entry."
                  id="outlined-error-helper-text"
                  type="text"
                  // id="input_capital"
                  inputProps={{
                    maxLength: 11,
                    style: { textTransform: "uppercase" },
                  }}
                  variant="outlined"
                  autoComplete="off"
                  name="ifsc"
                  value={IFSCfromSearch}
                  onChange={(e) => setIFSCfromSearch(e.target.value)}
                  onBlur={handleBlur}
                  // className="form-control"
                  label="Enter IFSC Code"
                  disabled={textifsc}
                  InputProps={{
                    endAdornment:
                      IfscResponse &&
                      (IfscResponse !== "Not Found" ? (
                        <SubInputAdornment Dataicon={<CheckCircleIcon />} />
                      ) : (
                        <SubInputAdornment Dataicon={<ErrorOutlineIcon />} />
                      )),
                  }}
                />

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
              </div>
              <Button
                type="submit"
                onClick={consoleData}
                className="btn-comman text-white"
              >
                Proceed
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default PanBankEmail;
