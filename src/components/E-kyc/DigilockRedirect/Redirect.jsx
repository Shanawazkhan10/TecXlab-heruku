import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import SERVER_ID from "../Configure/configure";
import { ORG_ID } from "../Helper/Helper";
import { useHistory } from "react-router";
import DialogAddess from "../SubComponent/DialogAddress";
const Redirect = () => {
  let urlData = window.location.pathname;
  const [Params, setParams] = useState(urlData);
  const [address, setAddress] = useState("");
  const history = useHistory();
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
  // var url = `${SERVER_ID}/api/digilocker/GetAuthorizationCode`;
  // var reqdata = {
  //   Lead_Id: Ret_Lead_Id,
  //   hmac: Ret_hmac,
  //   code: Ret_code,
  //   Method_Name: "DigiLocker_Res",
  // };

  // api_call.post(
  //   url,
  //   reqdata,
  //   "",
  //   function (res) {
  //     setParams(res);
  //   },
  //   function (res) {
  //     setParams(res);
  //   }
  // );
  fetch(`${SERVER_ID}/api/digilocker/GetAuthorizationCode`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    //make sure to serialize your JSON body
    body: JSON.stringify({
      Lead_Id: Ret_Lead_Id,
      hmac: Ret_hmac,
      code: Ret_code,
      source: 0,
      Method_Name: "DigiLocker_Res",
    }),
  }).then((res) => {
    res
      .json()
      .then((result) => setAddress(result.res_Output))
      .catch((err) => console.log(err));
    //do something awesome that makes the world a better place
  });

  // </script>
  //   }, []);
  const handleProceed = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    var raw = JSON.stringify({
      method_Name: "Update_Stage_Id",
      // mobile_No: localStorage.getItem("userInfo"),
      org_Id: ORG_ID,
      lead_Id: localStorage.getItem("lead_Id"),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${SERVER_ID}/api/lead/Update_StageId`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.res_Output[0].stage_Id);
        history.push(result.res_Output[0].stage_Id);
      })
      .catch((error) => console.log("error", error));
    // history.push("/Personal");
  };
  useEffect(() => {
    if (address !== "") {
      setTimeout(() => {
        handleProceed();
      }, 7000);
    }
  }, [address]);
  useEffect(() => {
    console.log(Params);
  }, [Params]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {address ? (
          <div>
            <DialogAddess address={address} />
          </div>
        ) : (
          <CircularProgress style={{ marginTop: "20%" }} />
        )}
      </div>
    </div>
  );
};

export default Redirect;
