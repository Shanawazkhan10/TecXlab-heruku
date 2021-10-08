import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import SERVER_ID from "../Configure/configure";
const Redirect = () => {
  let urlData = window.location.pathname;
  const [Params, setParams] = useState(urlData);
  //   useEffect(() => {
  // <script>
  const Get_QueryParams = (params) => {
    let href = window.location.href;
    //this expression is to get the query strings
    let reg = new RegExp("[?&]" + params + "=([^&#]*)", "i");
    let queryString = reg.exec(href);
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
          if (this.status == 401) {
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
      xmlhttp.open("POST", url, true);
      xmlhttp.setRequestHeader(
        "Content-Type",
        "application/json;charset=UTF-8"
      );
      if (token) {
        xmlhttp.setRequestHeader("Authorization", "Bearer " + token);
      }
      xmlhttp.send(JSON.stringify(content));
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
      xmlhttp.open("GET", url, true);
      if (token) {
        xmlhttp.setRequestHeader("Authorization", "Bearer " + token);
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
      xmlhttp.open("DELETE", url, true);
      if (token) {
        xmlhttp.setRequestHeader("Authorization", "Bearer " + token);
      }
      xmlhttp.send();
    },
  };

  var Ret_code = Get_QueryParams("code");
  var Ret_hmac = Get_QueryParams("hmac");
  var Ret_Lead_Id = Get_QueryParams("state");

  console.log(Ret_code);
  console.log(Ret_hmac);
  console.log(Ret_Lead_Id);
  //
  // Send this data to server
  var url = `${SERVER_ID}/api/digilocker/GetAuthorizationCode`;
  var reqdata = {
    Lead_Id: Ret_Lead_Id,
    hmac: Ret_hmac,
    code: Ret_code,
    Method_Name: "DigiLocker_Res",
  };

  api_call.post(
    url,
    reqdata,
    "",
    function (res) {
      console.log(res);
    },
    function (res) {
      console.log(res);
    }
  );

  // </script>
  //   }, []);
  useEffect(() => {
    console.log(Params);
  }, [Params]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress style={{ marginTop: "20%" }} />
      </div>
    </div>
  );
};

export default Redirect;
