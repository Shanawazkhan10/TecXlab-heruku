import React from 'react';
// import Loader from './Loader';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const Redirect = () => {
  const Get_QueryParams = (params) => {
    let href = window.location.href;

    //this expression is to get the query strings

    let reg = new RegExp('[?&]' + params + '=([^&#]*)', 'i');
    let queryString = reg.exec(href);

    // console.log("queryString",queryString);

    return queryString ? queryString[1] : null;
  };

  const api_call = {
    post: function (url, content, token, callback, errorCallback) {
      const xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
        if (
          this.readyState === 4 &&
          this.status >= 200 &&
          this.status < 300 &&
          callback
        ) {
          callback(this.responseText);
        } else if (this.readyState === 4 && errorCallback) {
          if (this.status === 401) {
            return;
          }

          //commented by satyendra to show original error message

          //errorCallback(this.statusText);

          errorCallback(this.responseText);
        }
      };

      xmlhttp.onerror = function () {
        if (errorCallback) {
          errorCallback();
        }
      };

      xmlhttp.open('POST', url, true);

      xmlhttp.setRequestHeader(
        'Content-Type',
        'application/json;charset=UTF-8'
      );

      if (token) {
        xmlhttp.setRequestHeader('Authorization', 'Bearer ' + token);
      }

      xmlhttp.send(JSON.stringify(content));
      console.log('ContentTest', content);
    },

    get: function (url, callback, errorCallback, token) {
      const xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
        if (
          this.readyState === 4 &&
          this.status >= 200 &&
          this.status < 300 &&
          callback
        ) {
          callback(this.responseText);
        } else if (this.readyState === 4 && errorCallback) {
          errorCallback();
        }
      };

      xmlhttp.onerror = function () {
        if (errorCallback) {
          errorCallback();
        }
      };

      xmlhttp.open('GET', url, true);

      if (token) {
        xmlhttp.setRequestHeader('Authorization', 'Bearer ' + token);
      }

      xmlhttp.send();
    },

    delete: function (url, callback, errorCallback, token) {
      const xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
        if (
          this.readyState === 4 &&
          this.status >= 200 &&
          this.status < 300 &&
          callback
        ) {
          callback(this.responseText);
        } else if (this.readyState === 4 && errorCallback) {
          errorCallback();
        }
      };

      xmlhttp.onerror = function () {
        if (errorCallback) {
          errorCallback();
        }
      };

      xmlhttp.open('DELETE', url, true);

      if (token) {
        xmlhttp.setRequestHeader('Authorization', 'Bearer ' + token);
      }

      xmlhttp.send();
    },
  };

  var Ret_code = Get_QueryParams('code');

  var Ret_hmac = Get_QueryParams('hmac');

  var Ret_Lead_Id = Get_QueryParams('state');

  console.log('Ret_code', Ret_code);

  console.log('Ret_hmac', Ret_hmac);

  console.log('Ret_Lead_Id', Ret_Lead_Id);

  // Send this data to server

  var url = 'http://localhost:44330/v1/api/digilocker/GetAuthorizationCode';

  var reqdata = {
    Lead_Id: Ret_Lead_Id,

    hmac: Ret_hmac,

    code: Ret_code,

    Method_Name: 'DigiLocker_Res',
  };

  api_call.post(
    url,
    reqdata,
    ''
    // function (res) {
    //   console.log('res', res);
    // },
    // function (res) {
    //   console.log(res);
    // }
  );

  const HandleReq = () => {
    api_call.post(
      url,
      reqdata,
      ''
      // function (res) {
      //   console.log('res', res);
      // },
      // function (res) {
      //   console.log(res);
      // }
    );
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    api_call.post(
      url,
      reqdata,
      ''
      // function (res) {
      //   console.log('res', res);
      // },
      // function (res) {
      //   console.log(res);
      // }
    );
    setOpen(!open);
  };
  //   var test = ['test', 'hello', 'jack', 'mike'];
  //   var testRes = test.sort()
  //   console.log(test);
  //   console.log(testRes);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 172px)',
      }}
    >
      {/* <h5>
        Please wait. page will redirect you in while...
        <CircularProgress />
      </h5>
      <div>
        {' '}
        <Button onClick={HandleReq}>Click</Button>
      </div> */}
      <Button onClick={handleToggle}>Click</Button>
      {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color='inherit' />
      </Backdrop> */}
    </div>
  );
};

export default Redirect;
