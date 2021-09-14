import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Image from "react-bootstrap/Image";
import accImg from "../../../images/Account_Opening_Fee_Illustration.png";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import "./AccStyle.css";
import SERVER_ID from "../Configure/configure";

const AccOpenInfo = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/AccountOpen");
  };
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const __DEV__ = document.domain === "localhost";
  const handlePay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: __DEV__ ? "rzp_test_dojmbldJSpz91g" : "PRODUCTION_KEY",
      currency: "INR",
      amount: 20000,
      // order_id: data.id,
      name: "Donation",
      description: "Thank you for nothing. Please give us some money",
      //   image: "http://localhost:1337/logo.svg",

      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        // window.location.href = "/PersonalInfo";
        // post to database
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          `Bearer ${localStorage.getItem("userToken")}`
        );
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          inr: 200,
          currency: "INR",
          mobile_No: localStorage.getItem("userInfo"),
          merchantTransactionId: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${SERVER_ID}/api/RazorPay/RazorPayStatus`, requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
        // end function
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col md="6" className="mt-5">
            <Image className="mt-4" src={accImg} fluid />
          </Col>
          <Col md="6" className="form-info">
            <span style={{ fontSize: "12px" }}>
              <b>Step 4 of 7</b>
            </span>
            <br />
            <h3 className="float-left">
              Account Opening is{" "}
              <b style={{ textDecoration: "line-through" }}>200</b>{" "}
              <b style={{ color: "#3457D5" }}>FREE !</b>
            </h3>
            <br />
            <hr className="hr-personal color-gradiant" />

            <Col md="8" className="insider">
              <h4 className="ml-3">Equity</h4>
              <Col>
                Buy and sell shares, mutual funds and derivatives <br /> on NSE
                and BSE
              </Col>
            </Col>
            <Col md="8" className="mt-3 p-1">
              <div className="total-sec">
                <text>Total</text>
                <text style={{ color: "#3457D5" }}>₹0</text>
              </div>
            </Col>
            <Col className="ml-4 pt-4" md="8">
              <Button
                onClick={handlePay}
                type="submit"
                className="btn-comman text-white"
              >
                PAY
              </Button>
            </Col>
            <Col className="ml-4 pt-4" md="8">
              <Button
                onClick={handleClick}
                type="submit"
                className="btn-comman text-white"
              >
                Proceed
              </Button>
            </Col>
            <div
              className="mt-4"
              style={{
                color: "#8C92AC",
                fontSize: "10px",
              }}
            >
              *You can create F&O and commodity account after equity account
              opening is completed.
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccOpenInfo;