import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Image from 'react-bootstrap/Image';
import WebCamImg from '../../../images/Webcam_Verification_Illustration.png';
import './style.css';
import VideoRecord from './VideoRecord';

const WebCam = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col md="6" className="div-PanEmail">
            <Col>
              <text style={{ fontSize: '12px' }}>
                <b>Step 5 of 7</b>
              </text>
              <br />
              <h3 className="float-left">Webcam Verification (IPV)</h3>
              <br />
              <hr className="hr-personal color-gradiant" />

              <text>Steps to do IPV :</text>
              <br />
              <text className="web-info">
                1. Click on capture button to get the OTP on screen.
                <br /> 2. Once you see the OTP the recording will start. <br />
                3. Enter the OTP in the textbox below capture button. <br />
                4. Once you enter the OTP recording will stop and it will get
                verified
              </text>
            </Col>
            <Col>
              <Image className="mt-5 mb-5 login-img-res" src={WebCamImg} />
            </Col>
          </Col>
          <Col
            md="6"
            className="div-PanEmail"
            style={{ border: '1px solid black' }}
          >
            <div className="mt-5" style={{ textAlign: 'center' }}>
              {' '}
              <VideoRecord style={{ width: `20vw` }} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WebCam;
