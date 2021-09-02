import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { conVal } from '../Helper/Helper';
import SERVER_ID from '../Configure/configure';
import { Container, Row, Col } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Image from 'react-bootstrap/Image';
import { Formik } from 'formik';
import './PanBankEmail.css';
import startImg from '../../../images/Get_Started_Illustration.png';
import { useHistory } from 'react-router';

const PanBankEmail = () => {
  const history = useHistory();
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          otp: '',
          pan: '',
          dob: '',
          AcNo: '',
          ifsc: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email && !values.pan && !values.ifsc) {
            errors.email = 'Required';
            errors.pan = 'Required';
            errors.ifsc = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) &&
            !/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/i.test(values.pan) &&
            !/^[A-Z]{4}[0][A-Z0-9]{6}$/i.test(values.ifsc)
          ) {
            errors.email = 'Please enter the valid email address.';
            errors.pan = 'Please enter the valid PAN.';
            errors.ifsc = 'Invalid IFSC';
          }
          return errors;
        }}
        onSubmit={(values) => {
          console.log(values);
          history.push('/PersonalInfo');
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <div>
            <Container>
              <Row>
                <Col className="mt-5" md="6">
                  <Image src={startImg} fluid />
                </Col>
                <Col md="6" className="div-PanEmail">
                  <Row>
                    <Col>
                      <h3 className="float-left">Let's get started</h3>
                      <br />
                      <hr className="hr-personal color-gradiant" />
                    </Col>
                  </Row>
                  <form onSubmit={handleSubmit}>
                    <>
                      <Container>
                        <Row
                          className="mt-2"
                          // style={{ border: '1px solid black' }}
                        >
                          <Col sm="12" md="6" className="margin-pan">
                            <TextField
                              variant="outlined"
                              type="text"
                              name="email"
                              fullWidth
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              label="Enter your email"
                            />
                            <span style={{ color: 'red', fontSize: '9px' }}>
                              {errors.email && touched.email && errors.email}
                            </span>
                          </Col>
                          <Col sm="12" md="6" className="margin-pan">
                            <TextField
                              variant="outlined"
                              type="password"
                              fullWidth
                              name="otp"
                              label="Enter OTP"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.OTP}
                            />
                          </Col>
                        </Row>
                        <Row
                          className="mt-2"
                          // style={{ border: '1px solid red' }}
                        >
                          <Col
                            // className="mt-3"
                            sm="12"
                            md="6"
                            className="margin-pan"
                          >
                            {' '}
                            <TextField
                              type="text"
                              fullWidth
                              variant="outlined"
                              autoComplete="off"
                              name="pan"
                              value={values.pan}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              inputProps={{
                                style: { textTransform: 'uppercase' },
                              }}
                              label="Enter PAN Number"
                            />
                            <span style={{ color: 'red', fontSize: '9px' }}>
                              {errors.pan && touched.pan && errors.pan}
                            </span>
                          </Col>
                          <Col
                            // className="mt-3"
                            sm="12"
                            md="6"
                            className="margin-pan"
                          >
                            {' '}
                            <TextField
                              id="date"
                              name="dob"
                              variant="outlined"
                              label="Enter DOB"
                              type="date"
                              value={values.dob}
                              // defaultValue={moment().format("MM-DD-YYYY")}
                              className="form-control"
                              onChange={handleChange}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              style={{
                                marginBottom: '15px',
                              }}
                            />
                          </Col>
                        </Row>
                        <Row
                          className="mt-2"
                          // style={{ border: '1px solid blue' }}
                        >
                          <Col
                            // className="mt-3"
                            sm="12"
                            md="6"
                            className="margin-pan"
                          >
                            {' '}
                            <TextField
                              type="number"
                              variant="outlined"
                              autoComplete="off"
                              name="AcNo"
                              value={values.AcNo}
                              onChange={handleChange}
                              className="form-control"
                              label="Enter Bank A/C Number"
                              style={{
                                marginBottom: '15px',
                              }}
                            />
                          </Col>
                          <Col
                            // className="mt-3"
                            sm="12"
                            md="6"
                            className="margin-pan"
                          >
                            {' '}
                            <TextField
                              type="text"
                              fullWidth
                              variant="outlined"
                              autoComplete="off"
                              name="ifsc"
                              id="fieldSelectorNo"
                              value={values.ifsc}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              inputProps={{
                                style: { textTransform: 'uppercase' },
                              }}
                              label="Enter IFSC Code"
                            />
                            <span style={{ color: 'red', fontSize: '9px' }}>
                              {errors.ifsc && touched.ifsc && errors.ifsc}
                            </span>
                          </Col>
                        </Row>

                        <br />
                        <br />
                        <Row>
                          <Col md="3"></Col>
                          <Col md="6">
                            <Button
                              fullWidth="true"
                              type="submit"
                              // onClick={consoleData}
                              className="btn-comman text-white"
                              disabled={isSubmitting}
                            >
                              Proceed
                            </Button>
                          </Col>
                          <Col md="3"></Col>
                        </Row>
                      </Container>
                    </>
                  </form>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default PanBankEmail;
