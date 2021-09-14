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
    history.push("/IPVerification");
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
