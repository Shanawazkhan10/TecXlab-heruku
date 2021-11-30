import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Button from "@material-ui/core/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import congratImg from "../../../images/Congratulations_Illustration_Web.png";
// import "./LastStep.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SERVER_ID from "../Configure/configure";
// import { Link } from "@material-ui/core";
// import samplePdf from "../../../images/Mangal_Keshav_KYC_Individual_Final.pdf";

const FnoNominee = () => {
  const [pdfData, setPdfData] = useState("");
  const downloadFile = (blob, fileName) => {
    const link = document.createElement("a");
    // create a blobURI pointing to our Blob
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    // some browser needs the anchor to be in the doc
    document.body.append(link);
    link.click();
    link.remove();
    // in case the Blob uses a lot of memory
    setTimeout(() => URL.revokeObjectURL(link.href), 7000);
  };
  useEffect(() => {
    if (pdfData !== "") {
      downloadFile(pdfData, "Esign.pdf");
    }
  }, [pdfData]);

  const handleView = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    var raw = JSON.stringify(
      // lead_Id: localStorage.getItem("lead_Id"),
      {
        lead_Id: "T001211000111",
      }
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      `${SERVER_ID}/api/eSign/Download_Application_Pdf`,
      requestOptions
    )
      .then((response) => response.blob())
      .then((result) => {
        var blob = new Blob([result], { type: "application/pdf" });
        setPdfData(blob);
      })
      .catch((error) => console.log("error", error));
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

  const HandleFund = async () => {
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
      amount: 2000,
      // order_id: data.id,
      name: "Add Funds to Trade Quickly",
      // description: 'Thank you for nothing. Please give us some money',
      //   image: "http://localhost:1337/logo.svg",

      prefill: {
        name: "John Doe",
        email: "johndoe@gmail.com",
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
        // alert('succeed');
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <div>
      <Container>
        <Row>
          <Col md="7" className="div-PanEmail">
            <div style={{ textAlign: "center" }}>
              <Button
                type="submit"
                onClick={HandleFund}
                className="btn-comman color-red text-white mb-3"
              >
                Add Funds to Trade Quickly <ArrowForwardIosIcon />
              </Button>
            </div>
            <Image className="ml-4 w-5" src={congratImg} fluid />
            <br />
            <Col className="text-center">
              <h3>Congratulations !</h3>
              <hr className="hr-center color-red" />
            </Col>
            <Col className="text-center">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Reprehenderit et placeat itaque hic nulla. Eaque sequi quae sit?
              </p>
            </Col>
          </Col>
          <Col md="5" className="div-PanEmail">
            <Col>
              <Card style={{ width: "22rem" }}>
                <Card.Body>
                  {/* <Card.Title>Card Title</Card.Title> */}
                  <Row>
                    <Col md="12">
                      <Card.Subtitle className="mb-2 text-muted">
                        {""}
                        <b>Username : </b> John Doe
                      </Card.Subtitle>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <Card.Subtitle className="mb-2 text-muted">
                        {""}
                        <b>Email ID :</b> johndoe@gmail.com
                      </Card.Subtitle>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col className="d-flex">
                      <Card.Subtitle className="mb-2 text-muted">
                        <b>Margin : </b>₹0.00{" "}
                        <text className="link-comman" onClick={HandleFund}>
                          Add Funds
                        </text>
                      </Card.Subtitle>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <br />
            <Col>
              <Card style={{ width: "22rem" }}>
                <Card.Body>
                  <Row>
                    <Col md="12">
                      <Button
                        fullWidth
                        type="submit"
                        className="btn-comman color-red text-white"
                      >
                        Open FNO Account
                      </Button>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col md="12">
                      <Button
                        fullWidth
                        type="submit"
                        className="btn-comman color-red text-white"
                      >
                        Open Commodity
                      </Button>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col md="12">
                      <Button
                        fullWidth
                        type="submit"
                        className="btn-comman color-red text-white"
                      >
                        Add Nominee
                      </Button>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col md="12">
                      {/* <Link
                        href={samplePdf}
                        download
                        alt="nodata"
                        style={{ textDecoration: 'none' }}
                      > */}
                      <Button
                        fullWidth
                        onClick={handleView}
                        type="submit"
                        className="btn-comman color-red text-white"
                      >
                        View Form
                      </Button>
                      {/* </Link> */}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FnoNominee;
