import React, { useState } from "react";
// import './PersonalInfo.css';
import { Container, Row, Col } from "reactstrap";
import { Image } from "react-bootstrap";
import Digi from "../../../images/digiLocker.jpg";
import aadharImg from "../../../images/Aadhar_KYC_Illustration.png";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

const AdhaarKyc = () => {
  const history = useHistory();
  const handleClick = () => {
    window.open(
      "https://accounts.digitallocker.gov.in/signin/oauth_partner/%252Foauth2%252F1%252Fauthorize%253Fresponse_type%253Dcode%2526client_id%253D140FF210%2526state%253D123%2526redirect_uri%253Dhttps%25253A%25252F%25252Fnuniyo.tech%25252FpersonalInfo%2526orgid%253D005685%2526txn%253D61431156b1d34c08396526e4oauth21631785302%2526hashkey%253D782a36c2c03b023143e5ebb2ab425fbfc5c46fd5e073441f6a0a0bd04b6f7d28%2526requst_pdf%253DY%2526signup%253Dsignup",
      "_blank"
    );

    // history.push("/IPVerification");
  };
  const handleProceed = () => {
    history.push("/PersonalInfo");
  };
  return (
    <div>
      <Container className="container-md">
        <Row>
          <Col md="6">
            <div className="form-info">
              <Row>
                <Col style={{ marginLeft: "30px" }}>
                  <h3 className="float-left ml=2">Adhaar KYC</h3>
                  <br />
                  <hr className="hr-personal color-gradiant" />
                </Col>
              </Row>
              <Col>
                <img src={Digi} alt="broken" width="200px" height="65px" />
              </Col>
              <br />
              <Container>
                <Col>
                  <text style={{ fontSize: "13px" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolores quae, eum odit ipsum vitae officia, repellat, dicta
                    itaque doloribus id nihil eius corporis blanditiis? Iste
                    quibusdam necessitatibus rem dolor recusandae? Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Quo beatae
                    voluptatum asperiores! Laudantium rerum aspernatur ducimus
                    ea? Aliquam voluptatem voluptate ratione iure, hic adipisci
                    fugit voluptas facilis fuga dicta repellendus.
                  </text>
                </Col>
                <br />
                <Button
                  // fullWidth="true"
                  type="submit"
                  onClick={handleClick}
                  className="btn-comman text-white"
                  style={{ textTransform: "capitalize", marginLeft: "10px" }}
                >
                  Contine to DigiLocker
                </Button>
                <br />
                <br />
                <Button
                  // fullWidth="true"
                  type="submit"
                  onClick={handleProceed}
                  className="btn-comman text-white"
                  style={{ textTransform: "capitalize", marginLeft: "10px" }}
                >
                  Proceed
                </Button>
                <br />
                <br />
                <Col>
                  <text style={{ fontSize: "13px" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aperiam voluptates sed, provident,
                  </text>
                </Col>
                <br />
                <Col>
                  <text style={{ fontSize: "13px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </text>
                </Col>
              </Container>
            </div>
          </Col>
          <Col className="mt-5" md="6">
            <Image src={aadharImg} fluid />
          </Col>
        </Row>
      </Container>
      <br />
    </div>
  );
};

export default AdhaarKyc;
