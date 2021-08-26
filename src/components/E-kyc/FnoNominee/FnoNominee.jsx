import React from "react";
import { Container, Row, Col } from "reactstrap";
import Button from "@material-ui/core/Button";
import Card from "react-bootstrap/Card";
// import "./LastStep.css";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
const FnoNominee = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col md="7" className="div-PanEmail">
            {/* <Col>
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
              <hr /> */}
            {/* </Col> */}
            <Col className="text-center">
              <h3>Last step !</h3>
              <hr className="hr-center color-gradiant" />
            </Col>
            <Col className="text-center">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Reprehenderit et placeat itaque hic nulla. Eaque sequi quae sit?
              </p>
            </Col>
            <Row>
              <Col md="6" className="mt-3">
                <Button
                  fullWidth="true"
                  type="submit"
                  // onClick={consoleData}
                  className="btn-comman text-white"
                >
                  E-sign
                </Button>
              </Col>
              <Col md="6" className="mt-3">
                <Button
                  fullWidth="true"
                  type="submit"
                  // onClick={consoleData}
                  className="btn-comman text-white"
                >
                  E-sign
                </Button>
              </Col>
            </Row>
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
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FnoNominee;
