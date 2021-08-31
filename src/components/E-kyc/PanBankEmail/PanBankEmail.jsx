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
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Please enter the valid email address.';
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
                        <Row>
                          <Col sm="12" md="6" className="margin-pan">
                            <TextField
                              variant="outlined"
                              type="text"
                              name="email"
                              fullWidth
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              label="Enter email"
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
                        <Row className="mt-2">
                          <Col
                            className="mt-3"
                            sm="12"
                            md="6"
                            className="margin-pan"
                          >
                            {' '}
                            <TextField
                              type="text"
                              // id="fieldSelectorNo"
                              // pattern="[1-9]{1}[0-9]{9}"
                              variant="outlined"
                              autoComplete="off"
                              name="pan"
                              value={values.pan}
                              onChange={handleChange}
                              // onInput={PanValidator}
                              className="form-control"
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
                            className="mt-3"
                            sm="12"
                            md="6"
                            className="margin-pan"
                          >
                            {' '}
                            <TextField
                              id="date"
                              name="dob"
                              variant="outlined"
                              label="Birthday"
                              type="date"
                              value={values.dob}
                              // defaultValue={moment().format("MM-DD-YYYY")}
                              className="form-control"
                              onChange={handleChange}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col
                            className="mt-3"
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
                            />
                          </Col>
                          <Col
                            className="mt-3"
                            sm="12"
                            md="6"
                            className="margin-pan"
                          >
                            {' '}
                            <TextField
                              type="text"
                              // id="input_capital"
                              variant="outlined"
                              autoComplete="off"
                              name="ifsc"
                              id="fieldSelectorNo"
                              value={values.ifsc}
                              // pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
                              // pattern="/^[A-Za-z]{4}\d{7}$/"
                              // value={inputs.ifsc}
                              onChange={handleChange}
                              className="form-control"
                              inputProps={{
                                style: { textTransform: 'uppercase' },
                              }}
                              label="Enter IFSC Code"
                            />
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
