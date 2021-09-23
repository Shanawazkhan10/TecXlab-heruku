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
import moment from "moment";
// import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router";
import SubInputAdornment from "../SubComponent/SubInputAdornment";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// import { DatePicker } from "@material-ui/pickers";
import ListItem from "@material-ui/core/ListItem";

import List from "@material-ui/core/List";
import DateFnsUtils from "@date-io/date-fns";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.css";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Stack from "@mui/material/Stack";

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
  const [textifsc, setTextifsc] = useState(false);
  const [IFSCfromSearch, setIFSCfromSearch] = useState("");
  const [emailCircular, setemailCircular] = useState(false);
  const [panCircular, setpanCircular] = useState(false);
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [emails, setEmails] = useState("");
  const [PanDetails, setPanDetails] = useState("");
  const [PanDisable, setPanDisable] = useState(true);
  const [AccountNoDisable, setAccountNoDisable] = useState(true);
  const [DobDisable, SetDobDisable] = useState(true);
  const [ifscDisable, setifscDisable] = useState(true);
  const [disbaleEmail, setdisbaleEmail] = useState(false);
  // const [PanDisable, setPanDisable] = useState(true);
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    email: "",
    // otp: "",
    pan: "",
    dob: "",
    AcNo: "",
    ifsc: "",
    // address: "",
  });

  // const [errorMsg, seterrorMsg] = useState({
  //   errorOBJ: {
  //     errorEmail: "",
  //     errorPan: "",
  //     error: "",
  //   },
  // });
  const [selectedDate, setSelectedDate] = useState(null);
  const [btnDisable, setbtnDisable] = useState(true);
  const classList = useStylesForList();
  useEffect(() => {
    if (emailResponse.status !== 200) {
      setPanDisable(true);
    } else {
      setPanDisable(false);
      setdisbaleEmail(true);
    }
  }, [emailResponse]);

  //For Date of Birth Field
  // useEffect(() => {
  //   if (panResponse.status !== 200) {
  //     SetDobDisable(true);
  //   } else {
  //     SetDobDisable(false);
  //   }
  // }, [panResponse]);

  useEffect(() => {
    if (inputs.AcNo !== "") {
      setifscDisable(false);
    }
  }, [inputs.AcNo]);
  // useEffect(() => {
  //   // const unsuscribe = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append(
  //     "Authorization",
  //     `Bearer ${localStorage.getItem("userToken")}`
  //   );
  //   var raw = JSON.stringify({
  //     stageId: 1,
  //     mobile_No: localStorage.getItem("userInfo"),
  //   });

  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(`${SERVER_ID}/api/lead/Update_StageId`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) =>
  //       // console.log(
  //       {
  //         setEmails(result.res_Output[0].result_Description);
  //         setPanDetails(result.res_Output[0].result_Extra_Key);
  //       }
  //     )
  //     .catch((error) => console.log("error", error));
  //   // };
  //   // return unsuscribe;
  // }, []);
  useEffect(() => {
    if (selectedDate !== "" && PanDetails !== "") {
      handleKRASolidFetch();
      setAccountNoDisable(false);
    }
  }, [selectedDate]);
  useEffect(() => {}, []);
  const handleKRASolidFetch = () => {
    console.log(PanDetails);
    // console.log("i m called");
    if (selectedDate !== "") {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("userToken")}`
      );
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        pan_No: PanDetails,
        mobile_No: localStorage.getItem("userInfo"),
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${SERVER_ID}/api/cvlkra/Get_PanStatus`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log("HELLO:", result);
        })
        .catch((error) => console.log("error", error));
    }
    // solidCity pan API
    const FormattedDate = moment(selectedDate).format("DD/MM/YYYY");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      apP_PAN_NO: PanDetails,
      apP_DOB_INCORP: FormattedDate,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${SERVER_ID}/api/cvlkra/SolicitPANDetailsFetchALLKRA`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log("SEOCUND CALL", result))
      .catch((error) => console.log("error", error));
  };

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
  const handleProceed = (e) => {
    e.preventDefault();

    const FormattedDate = moment(selectedDate).format("DD/MM/YYYY");
    const FormData = {
      ...inputs,
      dob: `${FormattedDate}`,
      ifsc: IFSCfromSearch,
      email: emails,
      pan: PanDetails,
    };
    if (
      FormData.pan &&
      FormData.dob &&
      FormData.email &&
      FormData.ifsc &&
      FormData.AcNo !== ""
    ) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("userToken")}`
      );
      var raw = JSON.stringify({
        method_Name: "Update_Stage_Id",
        mobile_No: localStorage.getItem("userInfo"),
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${SERVER_ID}/api/lead/Update_StageId`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      history.push("/AccountOpen");
    }
    console.log(FormData);
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
    if (IFSCfromSearch !== "") {
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
    }
  };
  const handleEmailBlur = () => {
    if (emails === "") {
      return;
    }
    setemailCircular(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      mobile_No: localStorage.getItem("userInfo"),
      email: emails,
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

        if (result !== "") {
          setemailCircular(false);
        }
        if (result.status === 200) {
          var myHeaders = new Headers();
          myHeaders.append(
            "Authorization",
            `Bearer ${localStorage.getItem("userToken")}`
          );
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            mobile_No: localStorage.getItem("userInfo"),
            email: emails,
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
        } else {
          setemailCircular(false);
          return;
        }
        // console.log(result.status);
      })
      .catch((error) => console.log("error", error));
  };
  const ifscConfirm = () => {
    setTextifsc(true);
    setOpenIfsc(false);
    // api call
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      beneficiary_account_no: inputs.AcNo,
      beneficiary_ifsc: IFSCfromSearch,
      mobile_No: localStorage.getItem("userInfo"),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${SERVER_ID}/api/bank/VerifyBankAccount`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const handlePanBlur = () => {
    if (PanDetails === "") {
      return;
    }
    setpanCircular(true);
    if (PanDetails !== "") {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("userToken")}`
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        pan_No: PanDetails,
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
          // error handling for NSDL PAN
          if (result.status !== 200) {
            setpanCircular(false);
            console.log(result);
            return;
          }
          setPanResponse(result);
          if (result !== "") {
            setpanCircular(false);
          }
          if (result.res_Output[0].result_Description === "E") {
            var PanToKra = PanDetails;
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
  const handleToggle = (value) => async () => {
    // console.log(value.ifsc);
    setIFSCfromSearch(value.ifsc);
    setBankName("");
    setBranchName("");
    setOpen(false);
    setBankDetails("");
    if (value.ifsc !== "") {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      const response = await fetch(
        `https://ifsc.razorpay.com/${value.ifsc}`,
        requestOptions
      );
      const getIfscData = await response.json();
      setIfscResponse(getIfscData);
      setOpenIfsc(true);
    }
  };
  const minDate = "04.18.1996";
  const TextFieldComponent = (props) => {
    return <TextField {...props} disabled={true} />;
  };
  return (
    <div>
      {/* modal */}
      {/* <div> */}
      {/* <Container> */}
      {/* <BackDrop data={BackDropOption} /> */}
      <Dialog
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <Container style={{ width: 300 }}>
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
                // autoFocus
                margin="dense"
                id="name"
                label="Enter IFSC Code"
                type="text"
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
                type="text"
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
                type="text"
                // fullWidth
              />
            </Col>
            <Row>
              <Col className="mt-3">
                <Button
                  // fullWidth="true"
                  type="submit"
                  onClick={IFSCsearch}
                  className="btn-searchIFSC text-white"
                >
                  Search
                </Button>
              </Col>
              {/* <Container style={{ height: 100 }}> */}
              <Col className="mt-2 ">
                <div className="search-list">
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
                                  <span style={{ fontSize: 13 }}>
                                    {value.branch}
                                  </span>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <span style={{ fontSize: 13 }}>
                                    Address :
                                  </span>{" "}
                                  <span style={{ fontSize: 11 }}>
                                    {value.address}
                                  </span>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <span style={{ fontSize: 13 }}>
                                    IFSC CODE :
                                  </span>{" "}
                                  <span style={{ fontSize: 11 }}>
                                    {value.ifsc}
                                  </span>{" "}
                                </Col>
                              </Row>
                            </Container>
                          </ListItem>
                        );
                      })}
                    </List>
                  )}
                </div>
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
                  // errorhelperText="Incorrect entry."
                  id="outlined-error-helper-text"
                  // autoFocus
                  disabled={disbaleEmail}
                  variant="outlined"
                  autoComplete="off"
                  name="email"
                  value={emails}
                  onChange={(e) => {
                    setEmails(e.target.value);
                  }}
                  onBlur={handleEmailBlur}
                  // className="form-control"
                  label="Enter Email ID"
                  InputProps={{
                    endAdornment:
                      emailCircular === true ? (
                        <div>
                          <CircularProgress false size={25} color="success" />
                        </div>
                      ) : (
                        emailResponse &&
                        (emailResponse.status !== 200 ? (
                          <SubInputAdornment
                            Dataicon={<ErrorOutlineIcon className="err-msg" />}
                          />
                        ) : (
                          <SubInputAdornment
                            Dataicon={<CheckCircleIcon className="succ-msg" />}
                          />
                        ))
                      ),
                  }}
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
                  // errorhelperText="Incorrect entry."
                  id="outlined-error-helper-text"
                  type="text"
                  // id="input_capital"
                  disabled={PanDisable}
                  inputProps={{
                    maxLength: 10,
                    style: { textTransform: "uppercase" },
                  }}
                  variant="outlined"
                  autoComplete="off"
                  name="pan"
                  value={PanDetails}
                  onBlur={handlePanBlur}
                  onChange={(e) => {
                    setPanDetails(e.target.value);
                  }}
                  // className="form-control"
                  label="Enter PAN Number"
                  InputProps={{
                    endAdornment:
                      panCircular === true ? (
                        <div>
                          <CircularProgress false size={25} color="success" />
                        </div>
                      ) : (
                        panResponse &&
                        (panResponse.res_Output[0].result_Description ===
                        "E" ? (
                          <SubInputAdornment
                            Dataicon={<CheckCircleIcon className="succ-msg" />}
                          />
                        ) : (
                          <SubInputAdornment
                            Dataicon={<ErrorOutlineIcon className="err-msg" />}
                          />
                        ))
                      ),
                  }}
                />
                {/* commented for handle error */}
                {/* {panResponse !== "" &&
                  (panResponse.res_Output[0].result_Description === "E" ? (
                    <div>
                      <span className="pan-error">Pan No. exist</span>
                    </div>
                  ) : (
                    <div>
                      <span className="error-email">Pan No. not exist</span>
                    </div>
                  ))} */}
                {/* commented for handle error */}
                {/* <TextField
                  // errorhelperText="Incorrect entry."
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
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    name="dob"
                    // errorhelperText="Incorrect entry."
                    variant="inline"
                    inputVariant="outlined"
                    label="Enter DOB"
                    format="dd/MM/yyyy"
                    orientation="landscape"
                    clearable
                    TextFieldComponent={TextFieldComponent}
                    minDate={minDate || undefined}
                    maxDate={new Date()}
                    value={selectedDate}
                    InputAdornmentProps={{ position: "end" }}
                    onChange={setSelectedDate}
                    // onChangeCapture={handleKRASolidFetch}
                    // onBlur={handleKRASolidFetch}
                  />
                </MuiPickersUtilsProvider> */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack>
                    <DatePicker
                      name="dob"
                      openTo="day"
                      variant="inline"
                      inputVariant="outlined"
                      views={["year", "month", "day"]}
                      label="Enter DOB"
                      clearable
                      orientation="landscape"
                      TextFieldComponent={TextFieldComponent}
                      value={selectedDate}
                      disabled={DobDisable}
                      // inputFormat="dd/mm/yyyy"
                      minDate={new Date("1980-04-18")}
                      maxDate={new Date()}
                      onChange={setSelectedDate}
                      onBlur={handleKRASolidFetch}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          helperText={null}
                        />
                      )}
                    />
                  </Stack>
                </LocalizationProvider>
                <TextField
                  // errorhelperText="Incorrect entry."
                  id="outlined-error-helper-text"
                  // type="number"
                  variant="outlined"
                  autoComplete="off"
                  id="outlined-error-helper-text"
                  type="text"
                  inputProps={{
                    maxLength: 8,
                    style: { textTransform: "uppercase" },
                  }}
                  name="AcNo"
                  disabled={AccountNoDisable}
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
                  // errorhelperText="Incorrect entry."
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
                  disabled={ifscDisable}
                  InputProps={{
                    endAdornment:
                      IfscResponse &&
                      (IfscResponse !== "Not Found" ? (
                        <SubInputAdornment
                          Dataicon={<CheckCircleIcon className="succ-msg" />}
                        />
                      ) : (
                        <SubInputAdornment
                          Dataicon={<ErrorOutlineIcon className="err-msg" />}
                        />
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
                // disabled={btnDisable}
                type="submit"
                onClick={handleProceed}
                className="btn-comman text-white ml-2"
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
