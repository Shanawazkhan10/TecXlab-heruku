import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
// import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// import { Label, FormGroup } from 'reactstrap';
import Image from 'react-bootstrap/Image';
import {
  makeStyles,
  //   MenuItem,
  //   InputLabel,
  //   Button,
  //   FormControl,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

const OpenAcc = () => {
  return (
    <div>
      <Container>
        <Row>
          {/* <Col mr="6">sss</Col> */}
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
              <Row
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '13px',
                  border: '1px solid #3457D5',
                  borderRadius: '10px',
                  padding: '10px',
                }}
              >
                <Col
                  style={{
                    display: 'flex',
                    // border: '4px solid blue',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <FormControlLabel
                    // style={{
                    //   // border: '2px solid red',
                    //   display: 'flex',
                    //   flexDirection: 'row',
                    // }}
                    control={
                      <Checkbox
                        //   style={{ border: '1px solid black' }}
                        //   checked={state.checkedB}
                        //   onChange={handleChange}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Equity"
                  />
                  ₹20
                </Col>

                <text style={{ marginLeft: '30px' }}>
                  Buy and sell shares, mutual funds and derivatives on NSE and
                  BSE
                </text>

                <Col>
                  <Col>
                    <div style={{ display: 'flex', flexDirection: 'row  ' }}>
                      {' '}
                      <FormControlLabel
                        style={{
                          // border: '2px solid red',
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                        control={
                          <Checkbox
                            //   style={{ border: '1px solid black' }}
                            //   checked={state.checkedB}
                            //   onChange={handleChange}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label="Equity"
                      />
                      <FormControlLabel
                        style={{
                          // border: '2px solid red',
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                        control={
                          <Checkbox
                            //   style={{ border: '1px solid black' }}
                            //   checked={state.checkedB}
                            //   onChange={handleChange}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label="F&O"
                      />{' '}
                      <FormControlLabel
                        style={{
                          // border: '2px solid red',
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                        control={
                          <Checkbox
                            //   style={{ border: '1px solid black' }}
                            //   checked={state.checkedB}
                            //   onChange={handleChange}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label="Currency"
                      />{' '}
                      <FormControlLabel
                        style={{
                          // border: '2px solid red',
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                        control={
                          <Checkbox
                            //   style={{ border: '1px solid black' }}
                            //   checked={state.checkedB}
                            //   onChange={handleChange}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label="Commodity    "
                      />
                    </div>
                  </Col>
                </Col>
                <text style={{ marginLeft: '30px' }}>
                  ₹<b>20</b> per order for F&O, Currency and Commodity
                </text>
              </Row>
            </div>
            <Row
              className="mt-4"
              md="7"
              style={{
                borderTop: '1px solid #8C92AC',
                borderBottom: '1px solid #8C92AC',
                padding: '10px',
              }}
            >
              <Col style={{ display: 'flex', justifyContent: 'space-between' }}>
                <text>TOTAL</text>
                <b style={{ color: '#3457D5' }}>₹20</b>
              </Col>
            </Row>
          </Col>
          <Col className="mt-5" md="5">
            <Image
              // style={{
              //   marginTop: '36px',
              //   marginLeft: '30px',
              //   border: '1px solid blue',
              // }}
              src={require('../../../images/Account_Opening_Fee_Illustration.png')}
              fluid
            />
            <Col className="ml-5 mt-4">
              <Button
                // fullWidth="true"
                type="submit"
                // onClick={smsVerify}
                className="btn-comman text-white"
                style={{ textTransform: 'capitalize' }}
              >
                Proceed
              </Button>
            </Col>
          </Col>
        </Row>
      </Container>
      <br />
    </div>
  );
};

export default OpenAcc;
