import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import $ from 'jquery';
import SERVER_ID from '../Configure/configure';
import { Container, Row, Col } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Image from 'react-bootstrap/Image';
import './PanBankEmail.css';
import startImg from '../../../images/Get_Started_Illustration.png';
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';
// import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import { Typography } from '@mui/material';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router';
import SubInputAdornment from '../SubComponent/SubInputAdornment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
// import Checkbox from "@mui/material/Checkbox";
import Radio from '@mui/material/Radio';
import List from '@material-ui/core/List';
import DateFnsUtils from '@date-io/date-fns';
import CircularProgress from '@mui/material/CircularProgress';
import './style.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import { ORG_ID } from '../Helper/Helper';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
    },
  },
}));
const useStylesForList = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 200,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

// import { IfscValidator } from "../Helper/Helper";
function PanBankEmail() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openIfsc, setOpenIfsc] = useState(false);
  const [IfscResponse, setIfscResponse] = useState('');
  const [emailResponse, setemailResponse] = useState('');
  const [panResponse, setPanResponse] = useState('');
  const [textifsc, setTextifsc] = useState(false);
  const [IFSCfromSearch, setIFSCfromSearch] = useState('');
  const [emailCircular, setemailCircular] = useState(false);
  const [panCircular, setpanCircular] = useState(false);
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [emails, setEmails] = useState('');
  const [PanDetails, setPanDetails] = useState('');
  const [PanDisable, setPanDisable] = useState(true);
  const [AccountNoDisable, setAccountNoDisable] = useState(true);
  const [DobDisable, SetDobDisable] = useState(true);
  const [ifscDisable, setifscDisable] = useState(true);
  const [disbaleEmail, setdisbaleEmail] = useState(false);
  // const [PanDisable, setPanDisable] = useState(true);
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    email: '',
    // otp: "",
    pan: '',
    dob: '',
    AcNo: '',
    ifsc: '',
    // address: "",
  });

  const [errorMsg, seterrorMsg] = useState({
    errorOBJ: {
      errorEmail: '',
      errorPan: '',
      errorDate: '',
      errorAccNo: '',
      errorIFSC: '',
    },
  });
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
  useEffect(() => {
    $('.modal_open').hide();
  }, []);
  //For Date of Birth Field
  // useEffect(() => {
  //   if (panResponse.status !== 200) {
  //     SetDobDisable(true);
  //   } else {
  //     SetDobDisable(false);
  //   }
  // }, [panResponse]);

  useEffect(() => {
    if (inputs.AcNo !== '') {
      setifscDisable(false);
      $('.modal_open').show();
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
    if (selectedDate !== null && PanDetails !== '') {
      handleKRASolidFetch();
    }
  }, [selectedDate]);
  // useEffect(() => {
  //   var oneYearFromNow = new Date();
  //   const abc = oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 18);
  //   const bca = moment(abc).format("DD/MM/YYYY");
  //   console.log(bca);
  // }, []);
  const handleKRASolidFetch = () => {
    // const fromServer = moment(selectedDate).format("YYYY");
    var now = moment();
    var birthDate = moment(selectedDate);
    var yearDiff = moment.duration(now - birthDate).as('years');
    // const generate = Math.floor(yearDiff);
    // console.log(generate);
    // x.toString().length;
    // const a = generate.;
    const abc = yearDiff.toString();
    const bca = abc.split('.');
    // console.log('whole bca');
    console.log(bca[0]);
    if (bca[0].length === 2 && bca[0] >= 18) {
      setAccountNoDisable(false);
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorDate: '',
        },
      }));
      var myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        `Bearer ${localStorage.getItem('userToken')}`
      );
      myHeaders.append('Content-Type', 'application/json');
      var raw = JSON.stringify({
        pan_No: PanDetails,
        org_Id: ORG_ID,
        lead_Id: localStorage.getItem('lead_Id'),
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(`${SERVER_ID}/api/cvlkra/Get_PanStatus`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log('HELLO:', result);
        })
        .catch((error) => console.log('error', error));
      const FormattedDate = moment(selectedDate).format('DD/MM/YYYY');
      var myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        `Bearer ${localStorage.getItem('userToken')}`
      );
      myHeaders.append('Content-Type', 'application/json');
      var raw = JSON.stringify({
        org_Id: ORG_ID,
        lead_Id: localStorage.getItem('lead_Id'),
        paN_NO: PanDetails,
        date_Of_birth: FormattedDate,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(
        `${SERVER_ID}/api/cvlkra/SolicitPANDetailsFetchALLKRA`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log('SEOCUND CALL', result))
        .catch((error) => console.log('error', error));
    } else {
      setAccountNoDisable(true);
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorDate: 'Invalid date',
        },
      }));
    }
    // solidCity pan API
    // }

    // console.log("works");
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
  // useEffect(() => {
  //   if (inputs.dob !== '') {
  //     seterrorMsg((prevState) => ({
  //       ...prevState,
  //       errorOBJ: {
  //         ...prevState.errorOBJ,
  //         errorDate: '',
  //       },
  //     }));
  //   }
  //   if (inputs.AcNo !== '') {
  //     seterrorMsg((prevState) => ({
  //       ...prevState,
  //       errorOBJ: {
  //         ...prevState.errorOBJ,
  //         errorAccNo: '',
  //       },
  //     }));
  //   }
  // });

  const handleProceed = (e) => {
    e.preventDefault();

    const FormattedDate = moment(selectedDate).format('DD/MM/YYYY');
    const FormData = {
      ...inputs,
      dob: `${FormattedDate}`,
      ifsc: IFSCfromSearch,
      email: emails,
      pan: PanDetails,
    };

    if (FormData.email === '') {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorEmail: 'Please enter your email',
        },
      }));
    }
    if (FormData.pan === '' && PanDisable === false) {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorPan: 'Please enter your PAN',
        },
      }));
    }
    if (!selectedDate && DobDisable === false) {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorDate: 'Please enter your DOB bouy ',
        },
      }));
    }
    if (inputs.AcNo === '' && AccountNoDisable === false) {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorAccNo: 'Please enter your account number',
        },
      }));
    }
    if (FormData.ifsc === '' && ifscDisable === false) {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorIFSC: 'Please enter your IFSC',
        },
      }));
    }
    if (
      FormData.pan &&
      FormData.dob &&
      FormData.email &&
      FormData.ifsc &&
      FormData.AcNo !== ''
    ) {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append(
        'Authorization',
        `Bearer ${localStorage.getItem('userToken')}`
      );
      var raw = JSON.stringify({
        method_Name: 'Update_Stage_Id',
        // mobile_No: localStorage.getItem("userInfo"),
        org_Id: ORG_ID,
        lead_Id: localStorage.getItem('lead_Id'),
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(`${SERVER_ID}/api/lead/Update_StageId`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result.res_Output[0].stage_Id);
          history.push(result.res_Output[0].stage_Id);
        })
        .catch((error) => console.log('error', error));
    }
    console.log(FormData);
  };

  useEffect(() => {
    if (selectedDate) {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorDate: '',
        },
      }));
    }
    if (inputs.AcNo !== '' && inputs.AcNo.length >= 9) {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorAccNo: '',
        },
      }));
    }
  }, [selectedDate, inputs.AcNo]);

  $('#input_capital').keyup(function (e) {
    var str = $(this).val();
    $('#input_capital').val(str.toUpperCase());
  });
  // modal function
  // const openModal = () => {};
  const openModal = () => {
    setOpen(true);
    setBankDetails('');
  };

  const handleClose = () => {
    setOpen(false);
    setBankName('');
    setBranchName('');
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
    if (IFSCfromSearch !== '') {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
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
      console.log(getIfscData);
      if (getIfscData === 'Not Found') {
        seterrorMsg((prevState) => ({
          ...prevState,
          errorOBJ: {
            ...prevState.errorOBJ,
            errorIFSC: 'Please provide proper IFSC',
          },
        }));
      } else {
        seterrorMsg((prevState) => ({
          ...prevState,
          errorOBJ: {
            ...prevState.errorOBJ,
            errorIFSC: '',
          },
        }));
      }
      setOpenIfsc(true);
    }
  };
  const handleEmailBlur = () => {
    if (emails === '') {
      return;
    }
    setemailCircular(true);
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('userToken')}`
    );
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      org_Id: ORG_ID,
      lead_Id: localStorage.getItem('lead_Id'),
      // mobile_No: localStorage.getItem("userInfo"),
      email: emails,
      method_Name: 'Email_Status',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${SERVER_ID}/api/email/Email_Status`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setemailResponse(result);
        // console.log(result);
        if (result !== '') {
          setemailCircular(false);
        }
        if (result.status === 200) {
          seterrorMsg((prevState) => ({
            ...prevState,
            errorOBJ: {
              ...prevState.errorOBJ,
              errorEmail: '',
            },
          }));

          var myHeaders = new Headers();
          myHeaders.append(
            'Authorization',
            `Bearer ${localStorage.getItem('userToken')}`
          );
          myHeaders.append('Content-Type', 'application/json');

          var raw = JSON.stringify({
            org_Id: ORG_ID,
            lead_Id: localStorage.getItem('lead_Id'),
            mobile_No: localStorage.getItem('userInfo'),
            email: emails,
            method_Name: 'Update_Email',
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
          };

          fetch(`${SERVER_ID}/api/email/Update_Email`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
            })
            .catch((error) => console.log('error', error));
        } else {
          seterrorMsg((prevState) => ({
            ...prevState,
            errorOBJ: {
              ...prevState.errorOBJ,
              errorEmail: 'Please provide proper email',
            },
          }));
          setemailCircular(false);
          return;
        }
        // console.log(result.status);
      })
      .catch((error) => {
        console.log('error', error);

        // history.push("/");
      });
  };
  const handleIFSCDialog = async () => {
    setBankName('');
    setBranchName('');
    setOpen(false);
    setBankDetails('');
    if (IFSCfromSearch !== '') {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      const response = await fetch(
        `https://ifsc.razorpay.com/${IFSCfromSearch}`,
        requestOptions
      );
      const getIfscData = await response.json();
      setIfscResponse(getIfscData);
      setOpenIfsc(true);
    }
  };
  const ifscConfirm = () => {
    setTextifsc(true);
    setOpenIfsc(false);
    setifscDisable(true);
    // api call
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('userToken')}`
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      beneficiary_account_no: inputs.AcNo,
      beneficiary_ifsc: IFSCfromSearch,
      org_Id: ORG_ID,
      lead_Id: localStorage.getItem('lead_Id'),
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${SERVER_ID}/api/bank/VerifyBankAccount`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    // API FOR CONFIRM IFSC
    // API FOR CONFIRM IFSC
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('userToken')}`
    );
    myHeaders.append('Content-Type', 'application/json');
    console.log(IfscResponse.MICR, IfscResponse.ADDRESS);
    var raw = JSON.stringify({
      org_Id: ORG_ID,
      lead_Id: localStorage.getItem('lead_Id'),
      ifsC_Code: IFSCfromSearch,
      method_Name: '',
      micr: IfscResponse.MICR,
      address: IfscResponse.ADDRESS,
      branch: IfscResponse.BRANCH,
      contact: IfscResponse.CONTACT,
      phone: '',
      city: IfscResponse.CITY,
      state: IfscResponse.STATE,
      district: IfscResponse.DISTRICT,
      bank: IfscResponse.BANK,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${SERVER_ID}/api/bank/ConfirmIfscDetails`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        console.log('im called');
      })
      .catch((error) => console.log('error', error));
    // END FOR CONFIRM IFSC
    console.log(IFSCfromSearch);
  };

  const handlePanBlur = () => {
    if (PanDetails === '') {
      return;
    }
    console.log(PanDetails);
    setpanCircular(true);
    if (PanDetails !== '') {
      var myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        `Bearer ${localStorage.getItem('userToken')}`
      );
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        pan_No: PanDetails,
        lead_Id: localStorage.getItem('lead_Id'),
        org_Id: ORG_ID,
        // mobile_No: localStorage.getItem("userInfo"),
        method_Name: 'NSDLeKYCPanAuthentication',
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(
        `${SERVER_ID}/api/nsdlpan/NSDLeKYCPanAuthentication`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setPanResponse(result);
          // setTimeout(() => {
          //   if (result.status === 500) {
          //     setpanCircular(false);
          //     SetDobDisable(false);
          //     // setPanResponse("")
          //     alert("NOT GET RESPONSE FORM NSDL PAN");
          //     return;
          //   }
          // }, 10000);
          if (result.status !== 500) {
            if (result.res_Output[0].result_Description === 'E') {
              seterrorMsg((prevState) => ({
                ...prevState,
                errorOBJ: {
                  ...prevState.errorOBJ,
                  errorPan: '',
                },
              }));
              setpanCircular(false);
              SetDobDisable(false);
              var PanToKra = PanDetails;
              var myHeaders = new Headers();
              myHeaders.append(
                'Authorization',
                `Bearer ${localStorage.getItem('userToken')}`
              );
              myHeaders.append('Content-Type', 'application/json');

              var raw = JSON.stringify({
                pan_No: PanToKra,
                method_Name: 'Get_PanStatus',
              });

              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
              };

              fetch(`${SERVER_ID}/api/cvlkra/Get_PanStatus`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  // console.log(result)
                })
                .catch((error) => console.log('error', error));
            } else {
              seterrorMsg((prevState) => ({
                ...prevState,
                errorOBJ: {
                  ...prevState.errorOBJ,
                  errorPan: 'Please provide valid PAN.',
                },
              }));
              setpanCircular(false);
              SetDobDisable(false);
            }
          }
          // else{
          //   alert("No Response From NSDL, Please Try after some time");
          // setpanCircular(false);
          // setPanResponse("");
          // return;
          // }
        })
        .catch((error) => {
          console.log('error', error);
          alert('No Response From NSDL, Please Try after some time');
          setpanCircular(false);
          setPanResponse('');
          return;
        });
    }
  };
  const IFSCsearch = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('userToken')}`
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      bank: bankName,
      ifsc: 'string',
      branch: branchName,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${SERVER_ID}/api/ifscmaster/IFSC_Master_Search`, requestOptions)
      .then((response) => response.json())
      .then((result) => setBankDetails(result.res_Output))
      .catch((error) => console.log('error', error));
  };
  const handleToggle = (value) => async () => {
    // console.log(value.ifsc);
    setIFSCfromSearch(value.ifsc);
    // setBankName("");
    // setBranchName("");
    // setOpen(false);
    // setBankDetails("");
  };
  // const minDate = '04.18.1996';
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
          <Container style={{ width: 320 }}>
            {!bankDetails && (
              <div>
                <Row>
                  <Col md="10">
                    <span>Find your IFSC Code</span>
                  </Col>
                  <Col md="2">
                    <CloseIcon className="close" onClick={handleClose} />
                  </Col>
                </Row>
                {/* <Col md="12"> */}
                <Row>
                  <Col md="12">
                    <TextField
                      variant="outlined"
                      // autoFocus
                      margin="dense"
                      id="name"
                      label="Enter IFSC Code"
                      type="text"
                      fullWidth
                    />
                  </Col>
                </Row>
                {/* </Col> */}
                <Row>
                  <Col className="text-center">
                    {' '}
                    <span align="center">Or</span>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <TextField
                      variant="outlined"
                      // autoFocus
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      margin="dense"
                      id="name"
                      label="Enter Bank Name"
                      type="text"
                      fullWidth
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <TextField
                      variant="outlined"
                      // autoFocus
                      value={branchName}
                      margin="dense"
                      // id="name"Enter Branch Location
                      onChange={(e) => setBranchName(e.target.value)}
                      label="Enter Branch Location"
                      type="text"
                      fullWidth
                    />
                  </Col>
                </Row>
                {/* </Col> */}
                <Row>
                  <Col className="mt-3">
                    <Button
                      fullWidth="true"
                      type="submit"
                      onClick={IFSCsearch}
                      className="btn-searchIFSC text-white"
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
              </div>
            )}
            <Row>
              {/* <Container style={{ height: 100 }}> */}
              <Col className="mt-2 ">
                <div className="search-list">
                  {bankDetails && (
                    <div>
                      <List
                        // margin-left: 30px;
                        // margin-top: -43px;
                        style={{
                          overflowX: 'hidden',
                        }}
                        className={classList.root}
                      >
                        {bankDetails.map((value) => {
                          const labelId = `checkbox-list-label-${value}`;

                          return (
                            <div>
                              <Row>
                                <Col md="1">
                                  <Radio
                                    size="small"
                                    key={value.ifsc}
                                    role={undefined}
                                    dense
                                    button
                                    onClick={handleToggle(value)}
                                  />
                                </Col>
                                <Col md="11">
                                  <ListItem>
                                    <Container>
                                      <Row>
                                        <Col>
                                          <div
                                            style={{
                                              marginLeft: '30px',
                                              marginTop: '-43px',
                                            }}
                                          >
                                            <Typography
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                              }}
                                            >
                                              {value.branch}
                                            </Typography>
                                            {/* <br /> */}
                                            <Typography
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                              }}
                                            >
                                              Address :{' '}
                                              <span
                                                style={{
                                                  fontSize: 11,
                                                  fontWeight: 'bold',
                                                }}
                                              >
                                                {value.address}
                                              </span>
                                            </Typography>{' '}
                                            {/* <br /> */}
                                            <Typography
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                              }}
                                            >
                                              IFSC CODE :
                                              <span
                                                style={{
                                                  fontSize: 11,
                                                  fontWeight: 'bold',
                                                }}
                                              >
                                                {' '}
                                                {value.ifsc}
                                              </span>
                                            </Typography>{' '}
                                          </div>
                                        </Col>
                                      </Row>
                                    </Container>
                                  </ListItem>
                                  <hr />
                                </Col>
                              </Row>
                            </div>
                          );
                        })}
                      </List>
                      <Row>
                        <Col className="mt-3">
                          <Button
                            fullWidth="true"
                            type="submit"
                            onClick={handleIFSCDialog}
                            className="btn-searchIFSC text-white"
                          >
                            CONFIRM
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="mt-3">
                          <Button
                            fullWidth="true"
                            type="submit"
                            onClick={() => {
                              setIFSCfromSearch('');
                              setBankDetails('');
                            }}
                            className="btn-searchIFSC text-white"
                          >
                            CANCEL
                          </Button>
                        </Col>
                      </Row>
                    </div>
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
      {IfscResponse !== 'Not Found' && (
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
          <Col className="mt-5" md="5">
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
                  error={
                    errorMsg.errorOBJ.errorEmail && errorMsg.errorOBJ.errorEmail
                      ? true
                      : false
                  }
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
                <div className="email-error-div">
                  {errorMsg.errorOBJ.errorEmail && (
                    <span className="email-error-msg">
                      {errorMsg.errorOBJ.errorEmail}
                    </span>
                  )}
                </div>
                <TextField
                  // errorhelperText="Incorrect entry."
                  id="outlined-error-helper-text"
                  type="text"
                  error={
                    errorMsg.errorOBJ.errorPan &&
                    (errorMsg.errorOBJ.errorPan ? true : false)
                  }
                  // id="input_capital"
                  disabled={PanDisable}
                  inputProps={{
                    maxLength: 10,
                    style: { textTransform: 'uppercase' },
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
                        panResponse.status !== 500 &&
                        (panResponse.res_Output[0].result_Description !==
                        'E' ? (
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
                {/* commented for handle error */}
                <div className="email-error-div">
                  {errorMsg.errorOBJ.errorPan && (
                    <span className="email-error-msg">
                      {errorMsg.errorOBJ.errorPan}
                    </span>
                  )}
                </div>
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
                      openTo="year"
                      variant="inline"
                      // inputVariant="outlined"
                      views={['year', 'month', 'day']}
                      label="Enter DOB"
                      clearable
                      // inputFormat="dd/mm/yyyy"
                      orientation="landscape"
                      TextFieldComponent={TextFieldComponent}
                      value={selectedDate}
                      disabled={DobDisable}
                      // inputFormat="dd/mm/yyyy"
                      minDate={new Date('1953-12-12')}
                      maxDate={new Date('2003-12-12')}
                      onChange={setSelectedDate}
                      onBlur={handleKRASolidFetch}
                      renderInput={(params) => (
                        <TextField
                          error={
                            errorMsg.errorOBJ.errorDate &&
                            (errorMsg.errorOBJ.errorDate ? true : false)
                          }
                          variant="outlined"
                          {...params}
                        />
                      )}
                    />
                  </Stack>
                </LocalizationProvider>
                <div className="email-error-div">
                  {errorMsg.errorOBJ.errorDate && (
                    <span className="email-error-msg">
                      {errorMsg.errorOBJ.errorDate}
                    </span>
                  )}
                </div>
                <TextField
                  // errorhelperText="Incorrect entry."
                  id="outlined-error-helper-text"
                  // type="number"
                  variant="outlined"
                  error={
                    errorMsg.errorOBJ.errorAccNo &&
                    (errorMsg.errorOBJ.errorAccNo ? true : false)
                  }
                  autoComplete="off"
                  // id="outlined-error-helper-text"
                  type="text"
                  // inputProps={{
                  //   maxLength: 8,
                  //   style: { textTransform: 'uppercase' },
                  // }}
                  name="AcNo"
                  disabled={AccountNoDisable}
                  value={inputs.AcNo}
                  onChange={handleInputChange}
                  // className="form-control"
                  label="Enter Bank A/C Number"
                  inputProps={{
                    maxLength: 18,
                    style: { textTransform: 'uppercase' },
                  }}
                />
                <div className="ml-3 txt-msg">
                  NRE/NRO bank details not accepted*
                </div>
                <div className="email-error-div">
                  {errorMsg.errorOBJ.errorAccNo && (
                    <span className="email-error-msg">
                      {errorMsg.errorOBJ.errorAccNo}
                    </span>
                  )}
                </div>
                <TextField
                  // errorhelperText="Incorrect entry."
                  className="mb-1"
                  id="outlined-error-helper-text"
                  type="text"
                  error={errorMsg.errorOBJ.errorIFSC ? true : false}
                  // id="input_capital"
                  inputProps={{
                    maxLength: 11,
                    style: { textTransform: 'uppercase' },
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
                      (IfscResponse !== 'Not Found' ? (
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
                <div className="email-error-div">
                  {errorMsg.errorOBJ.errorIFSC && (
                    <span className="email-error-msg">
                      {errorMsg.errorOBJ.errorIFSC}
                    </span>
                  )}
                </div>
                <small>
                  {' '}
                  <p
                    // className=""
                    className="link-comman modal_open"
                    onClick={openModal}
                  >
                    <SearchIcon fontSize="small" /> Find Your IFSC Code
                  </p>
                </small>
              </div>
              <br />
              <Button
                // disabled={btnDisable}
                // className="mt-3"
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
