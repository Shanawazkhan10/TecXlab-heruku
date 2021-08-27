import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import $ from 'jquery';
import SERVER_ID from '../Configure/configure';
import { Container, Row, Col } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Image from 'react-bootstrap/Image';
import './PanBankEmail.css';
function PanBankEmail() {
  const [inputs, setInputs] = useState({
    email: '',
    otp: '',
    pan: '',
    dob: '',
    AcNo: '',
    ifsc: '',
  });
  useEffect(() => {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test.email) {
      // newErrors.email = "Enter a valid email id";
    }
  }, [inputs.email]);
  const handleInputChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInputs((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };
  const consoleData = () => {
    console.log(inputs.email);
  };

  $('#input_capital').keyup(function (e) {
    var str = $(this).val();
    $('#input_capital').val(str.toUpperCase());
  });
  return (
    <div>
      <Container>
        <Row>
          <Col className="mt-5" md="6">
            <Image
              src={require('../../../images/Get_Started_Illustration.png')}
              fluid
            />
          </Col>
          <Col md="6" className="div-PanEmail">
            <Row>
              <Col>
                <h3 className="float-left">Let's get started</h3>
                <br />
                <hr className="hr-personal color-gradiant" />
              </Col>
            </Row>
            <Row>
              <Col className="" sm="12" md="6" className="margin-pan">
                <TextField
                  type="text"
                  inputProps={{ style: { textTransform: 'capitalize' } }}
                  className=" margin-pan"
                  id="input_capital"
                  variant="outlined"
                  name="email"
                  defaultValue={inputs.email}
                  onChange={handleInputChange}
                  onBlur={consoleData}
                  // onChange={(e) => {
                  //   let cData = e.target.value.toUpperCase();
                  //   setPan(cData);
                  // }}
                  className="form-control"
                  label="Enter Email ID"
                />
              </Col>
              <Col className="mt-3" sm="12" md="6" className="margin-pan">
                <TextField
                  type="password"
                  variant="outlined"
                  name="otp"
                  value={inputs.otp}
                  onChange={handleInputChange}
                  // value={pan}
                  // onChange={(e) => {
                  //   let cData = e.target.value.toUpperCase();
                  //   setPan(cData);
                  // }}
                  className="form-control"
                  label="Enter OTP sent on mail"
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col className="mt-3" sm="12" md="6" className="margin-pan">
                {' '}
                <TextField
                  type="text"
                  variant="outlined"
                  name="pan"
                  value={inputs.pan}
                  onChange={handleInputChange}
                  // value={pan}
                  // onChange={(e) => {
                  //   let cData = e.target.value.toUpperCase();
                  //   setPan(cData);
                  // }}
                  className="form-control"
                  label="Enter PAN Number"
                />
              </Col>
              <Col className="mt-3" sm="12" md="6" className="margin-pan">
                {' '}
                <TextField
                  type="date"
                  id="outlined-basic"
                  variant="outlined"
                  name="dob"
                  value={inputs.dob}
                  onChange={handleInputChange}
                  // value={pan}
                  // onChange={(e) => {
                  //   let cData = e.target.value.toUpperCase();
                  //   setPan(cData);
                  // }}
                  className="form-control"
                  // label="Enter DOB"
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col className="mt-3" sm="12" md="6" className="margin-pan">
                {' '}
                <TextField
                  type="text"
                  variant="outlined"
                  name="AcNo"
                  value={inputs.AcNo}
                  onChange={handleInputChange}
                  // value={pan}
                  // onChange={(e) => {
                  //   let cData = e.target.value.toUpperCase();
                  //   setPan(cData);
                  // }}
                  className="form-control"
                  label="Enter Bank A/C Number"
                />
              </Col>
              <Col className="mt-3" sm="12" md="6" className="margin-pan">
                {' '}
                <TextField
                  type="text"
                  variant="outlined"
                  // value={pan}
                  name="ifsc"
                  value={inputs.ifsc}
                  onChange={handleInputChange}
                  // onChange={(e) => {
                  //   let cData = e.target.value.toUpperCase();
                  //   setPan(cData);
                  // }}
                  className="form-control"
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
                  onClick={consoleData}
                  className="btn-comman text-white"
                >
                  Proceed
                </Button>
              </Col>
              <Col md="3"></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default PanBankEmail;
