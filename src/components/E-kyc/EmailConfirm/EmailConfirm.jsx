import React, { useState } from "react";
import "./EmailConfirm.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ORG_ID } from "../Helper/Helper";
import SERVER_ID from "../Configure/configure";
const EmailConfirm = () => {
  const [email, setemail] = useState("");
  const [emailResponse, setEmailResponse] = useState("");
  const handleBlur = () => {
    console.log(email);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      org_Id: ORG_ID,
      lead_Id: localStorage.getItem("lead_Id"),
      email: email,
      method_Name: "Email_Status",
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
        setEmailResponse(result);
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="css-email-confirm">
      <h3>EMAIL CONFIRMATION</h3>

      <TextField
        className="mt-4"
        error={emailResponse && emailResponse.status !== 200 ? true : false}
        value={email}
        onChange={(e) => setemail(e.target.value)}
        onBlur={handleBlur}
        id="outlined-error"
        label="Enter Email"
        defaultValue="Hello World"
        helperText={
          emailResponse && emailResponse.status !== 200 && "Invalid Email."
        }
      />
      <br />
      <Button className="mt-3" variant="contained">
        Verify Email
      </Button>
    </div>
  );
};

export default EmailConfirm;
