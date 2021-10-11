import React, { useEffect, useState } from 'react';
import './EmailConfirm.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ORG_ID } from '../Helper/Helper';
import { InputAdornment } from '@material-ui/core/InputAdornment';
import SERVER_ID from '../Configure/configure';
import SubInputAdornment from '../SubComponent/SubInputAdornment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CircularProgress from '@mui/material/CircularProgress';

const EmailConfirm = () => {
  const [email, setemail] = useState('');
  const [emailResponse, setEmailResponse] = useState('');
  const [emailCircular, setemailCircular] = useState(false);

  const [errorMsg, seterrorMsg] = useState({
    errorOBJ: {
      errorEmail: '',
    },
  });

  const handleBlur = () => {
    // if (email === '') {
    //   return;
    // }

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
      email: email,
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
        setEmailResponse(result);
        if (result !== '') {
          setemailCircular(false);
        }
        console.log(result);
      })
      .catch((err) => console.log(err));
  };
  const HandleEmailCheck = () => {
    if (!email) {
      // alert('Please enter email');
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorEmail: 'Please enter your email',
        },
      }));
    } else {
      console.log(email);
    }
  };
  useEffect(() => {
    if (email !== '') {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorEmail: '',
        },
      }));
    }
  }, [email]);

  return (
    <div className="css-email-confirm">
      <h3>EMAIL CONFIRMATION</h3>

      <TextField
        className="mt-4"
        error={
          errorMsg.errorOBJ.errorEmail &&
          errorMsg.errorOBJ.errorEmail &&
          emailResponse.status !== 200
            ? true
            : false
        }
        value={email}
        onChange={(e) => setemail(e.target.value)}
        onBlur={handleBlur}
        id="outlined-error"
        label="Enter Email"
        defaultValue="Hello World"
        helperText={
          emailResponse && emailResponse.status !== 200 && 'Invalid Email.'
        }
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
      <div>
        {errorMsg.errorOBJ.errorEmail && (
          <span className="email-error-msg">
            {errorMsg.errorOBJ.errorEmail}
          </span>
        )}
      </div>
      <br />
      <Button className="mt-3" variant="contained" onClick={HandleEmailCheck}>
        Verify Email
      </Button>
    </div>
  );
};

export default EmailConfirm;
