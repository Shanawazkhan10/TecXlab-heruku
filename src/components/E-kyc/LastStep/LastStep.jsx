import React from "react";
import { Container, Row, Col } from "reactstrap";
import Button from "@material-ui/core/Button";
import Card from "react-bootstrap/Card";
import "./LastStep.css";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import { useHistory } from "react-router";
import SERVER_ID from "../Configure/configure";
const LastStep = () => {
  const history = useHistory();
  const handleClick = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    var raw = JSON.stringify({
      method_Name: "Update_Stage_Id",
      mobile_No: localStorage.getItem("userInfo"),
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
    history.push("/FnoNominee");
  };
  return (
    <div>
      <Container>
        <Row>
          <Col md="7" className="div-PanEmail">
            <Col>
              <h3 className="float-left">Last step !</h3>
              <br />
              <hr className="hr-personal color-gradiant" />
            </Col>
            <Col>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolorem ducimus sapiente impedit culpa ullam reiciendis aliquam
                inventore
              </p>
            </Col>
            <Col>
              <hr />
            </Col>
            <Col>
              <h3>Equity</h3>
            </Col>
            <Col>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Reprehenderit et placeat itaque hic nulla. Eaque sequi quae sit?
              </p>
            </Col>
            <Col>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Reprehenderit et placeat itaque hic nulla. Eaque sequi quae sit?
              </p>
            </Col>
            <Col md="6">
              <Button
                fullWidth="true"
                type="submit"
                className="btn-comman text-white"
                onClick={handleClick}
              >
                E-sign
              </Button>
            </Col>
            <Col>
              <hr />
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
                        <PersonOutlineRoundedIcon
                          className="class-icons"
                          fontSize="small"
                        />
                        {""}
                        Card Subtitle
                      </Card.Subtitle>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <Card.Subtitle className="mb-2 text-muted">
                        {/* <AiOutlineUser /> */}
                        <PersonOutlineRoundedIcon
                          className="class-icons"
                          fontSize="small"
                        />
                        {""}
                        Card Subtitle
                      </Card.Subtitle>
                    </Col>
                    <Col>
                      <Card.Subtitle className="mb-2 text-muted">
                        <PersonOutlineRoundedIcon
                          className="class-icons"
                          fontSize="small"
                        />
                        {""}
                        Card Subtitle
                      </Card.Subtitle>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col className="d-flex">
                      <Card.Subtitle className="mb-2 text-muted">
                        <PersonOutlineRoundedIcon
                          className="class-icons"
                          fontSize="small"
                        />
                        {""}
                        Card Subtitle
                      </Card.Subtitle>
                    </Col>
                  </Row>
                  <Card.Subtitle className="mb-2 text-muted mt-1">
                    <PersonOutlineRoundedIcon
                      className="class-icons"
                      fontSize="small"
                    />
                    {""}
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <br />
              <Row>
                <Col>
                  <h5>YOUR PAN</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3>HOCPK1987G</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Mollitia nemo iusto animi ducimus aliquid ut.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Button
                    fullWidth
                    type="submit"
                    onClick={handleClick}
                    className="btn-comman text-white"
                  >
                    Proceed
                  </Button>
                </Col>
              </Row>
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LastStep;
