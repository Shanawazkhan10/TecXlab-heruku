import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Image from 'react-bootstrap/Image';
import accImg from '../../../images/Account_Opening_Fee_Illustration.png';
import { Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { useHistory } from 'react-router';

const OpenAcc = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/AdhaarKYC');
  };
  return (
    <div>
      <Container>
        <Row>
          <Col md="7">
            <div className="form-info">
              <Row>
                <Col>
                  <h3 className="float-left">
                    Account Opening is{' '}
                    <b style={{ color: '#3457D5' }}>FREE !</b>
                  </h3>
                  <br />
                  <hr className="hr-personal color-gradiant" />
                </Col>
              </Row>
              <Col
                style={{
                  fontSize: '13px',
                  border: '1px solid #3457D5',
                  borderRadius: '10px',
                  padding: '10px',
                }}
              >
                <Row
                  // className="ml-2"
                  style={{
                    // border: '1px solid black',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Col>
                    <FormControlLabel
                      control={<Checkbox color="primary" />}
                      label="Equity"
                    />
                  </Col>
                  <Col>
                    <b>₹20</b>
                  </Col>
                </Row>
                <Row className="ml-5">
                  <Col>
                    {' '}
                    Buy and sell shares, mutual funds and derivatives on NSE and
                    BSE
                  </Col>
                </Row>

                <Row className="ml-1">
                  <Col md="5" sm="12" className="ml-5">
                    <FormControlLabel
                      control={<Checkbox color="primary" />}
                      label="Equity"
                    />
                    <FormControlLabel
                      control={<Checkbox color="primary" />}
                      label="Currency"
                    />
                  </Col>
                  <Col className="ml-5" md="5" sm="12">
                    <FormControlLabel
                      control={<Checkbox color="primary" />}
                      label="F&O"
                    />{' '}
                    <FormControlLabel
                      control={<Checkbox color="primary" />}
                      label="Commodity"
                    />
                  </Col>
                </Row>
                <Row className="ml-5">
                  <Col>
                    ₹<b>20</b> per order for F&O, Currency and Commodity
                  </Col>
                </Row>
              </Col>
            </div>
            <Row
              className="mt-4"
              style={{
                borderTop: '1px solid #8C92AC',
                borderBottom: '1px solid #8C92AC',
                padding: '10px',
                // border: '1px solid black',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Col>
                <text>TOTAL</text>
              </Col>
              <Col>
                <b style={{ color: '#3457D5' }}>₹20</b>
              </Col>
            </Row>
          </Col>
          <Col className="mt-5" md="5">
            <Image src={accImg} fluid />
            {/* <br />
            <br /> */}
            <Button
              fullWidth="true"
              type="submit"
              onClick={handleClick}
              className="btn-comman text-white"
              // style={{
              //   textTransform: 'capitalize',
              //   alignItems: 'center',
              //   textAlign: 'center',
              // }}
            >
              Proceed
            </Button>
          </Col>
        </Row>
      </Container>
      <br />
    </div>
  );
};

export default OpenAcc;
