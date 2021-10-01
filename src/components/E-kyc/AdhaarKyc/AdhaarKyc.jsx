import React from "react";
// import './PersonalInfo.css';
import { Container, Row, Col } from "reactstrap";
import { Image } from "react-bootstrap";
import Digi from "../../../images/digiLocker.jpg";
import aadharImg from "../../../images/Aadhar_KYC_Illustration.png";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import SERVER_ID from "../Configure/configure";
import { ORG_ID } from "../Helper/Helper";
const AdhaarKyc = (url) => {
  const history = useHistory();

  const handleClick = () => {
    url = `https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=140FF210&state=${localStorage.getItem(
      "lead_Id"
    )}&redirect_uri=https://nuniyo.tech/digilocker/index.html`;
    const newPopup = window.open(url, "name", "height=500,width=500");
    if (window.focus) {
      newPopup.focus();
    }
    return false;
  };
  const handleProceed = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    var raw = JSON.stringify({
      method_Name: "Update_Stage_Id",
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
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    history.push("/Personal");
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
                  <div style={{ fontSize: "13px" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolores quae, eum odit ipsum vitae officia, repellat, dicta
                    itaque doloribus id nihil eius corporis blanditiis? Iste
                    quibusdam necessitatibus rem dolor recusandae? Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Quo beatae
                    voluptatum asperiores! Laudantium rerum aspernatur ducimus
                    ea? Aliquam voluptatem voluptate ratione iure, hic adipisci
                    fugit voluptas facilis fuga dicta repellendus.
                  </div>
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
                  <div style={{ fontSize: "13px" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aperiam voluptates sed, provident,
                  </div>
                </Col>
                <br />
                <Col>
                  <div style={{ fontSize: "13px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </div>
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
