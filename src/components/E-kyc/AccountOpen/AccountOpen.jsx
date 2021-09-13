import React from "react";
import { Container, Row, Col } from "reactstrap";
import Image from "react-bootstrap/Image";
import AccOpen from "../../../images/Account_Opening_Fee_Illustration.png";
import { Button, FormControlLabel, Checkbox } from "@material-ui/core";
import "./style.css";
import { useHistory } from "react-router";

const AccountOpen = () => {
  const [checked, setChecked] = React.useState(true);
  const history = useHistory();
  const handleSubmit = (e) => {
    history.push("/AdhaarKYC");
  };
  const onHandleChange = () => {
    setChecked(false);
  };
  return (
    <div>
      <Container>
        <Row>
          <Col
            md="8"
            className="div-PanEmail"
            // style={{ border: '2px solid blue' }}
          >
            <Col>
              {" "}
              <text style={{ fontSize: "12px" }}>
                <b>Step 5 of 7</b>
                <br />
              </text>
              <h3 className="float-left">Account Opening Fees</h3>
              <br />
              <hr className="hr-personal color-gradiant" />
            </Col>
            <Col className="equ-price-outer">
              <Col className="equ-price">
                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={onHandleChange}
                      checked={checked}
                      color="primary"
                    />
                  }
                  label="Equity"
                />
                <text style={{ color: "#3457D5" }}>
                  <b>₹200</b>
                </text>
              </Col>
              <Col>
                <text style={{ fontSize: "13px" }}>
                  Buy and sell shares, mutual funds and derivatives on NSE and
                  BSE
                </text>
              </Col>
              <Col>
                <FormControlLabel
                  control={<Checkbox checked={checked} color="primary" />}
                  label="Equity"
                />
                <FormControlLabel
                  control={<Checkbox checked={checked} color="primary" />}
                  label="Currency"
                />
                <FormControlLabel
                  control={<Checkbox checked={checked} color="primary" />}
                  label="F&O"
                />{" "}
                <FormControlLabel
                  control={<Checkbox checked={checked} color="primary" />}
                  label="Commodity"
                />
              </Col>
            </Col>
            <Col className="comm-sec mt-3">
              <Col className="comm-pri">
                <FormControlLabel
                  control={<Checkbox checked={checked} color="primary" />}
                  label="Commodity"
                />
                <text style={{ color: "#3457D5" }}>
                  <b>₹100</b>
                </text>
              </Col>
              <Col>
                <div style={{ fontSize: "13px" }}>
                  Buy and sell commodities on MCX
                </div>
              </Col>
            </Col>
            <Col className="ttl-sec mt-3 p-2">
              <text className="ml-4">
                <b>Total</b>
              </text>
              <text className="mr-4" style={{ color: "#3457D5" }}>
                <b>₹300</b>
              </text>
            </Col>
          </Col>
          <Col md="4">
            <div className="mt-5">
              <Image src={AccOpen} className="mt-5 login-img-res" fluid />
              <Button
                fullWidth="true"
                type="submit"
                className="btn-comman text-white mt-4"
                onClick={handleSubmit}
              >
                Proceed
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccountOpen;
