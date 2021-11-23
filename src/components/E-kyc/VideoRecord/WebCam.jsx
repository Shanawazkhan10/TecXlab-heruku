import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Image from "react-bootstrap/Image";
import WebCamImg from "../../../images/Webcam_Verification_Illustration.png";
import "./style.css";
import VideoRecord from "./VideoRecord";
// import Swal from 'sweetalert2';
import { HiOutlineLightBulb } from "react-icons/hi";
import { GiSunglasses } from "react-icons/gi";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { FaRedhat } from "react-icons/fa";
import { RiSurgicalMaskLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
const WebCam = () => {
  const [data, SetData] = useState("");
  let history = useHistory();
  const sendToParent = (index) => {
    // console.log('IPV Data:', index);
    SetData(index);
  };
  history.listen((location, action) => {
    console.log("one change");
    // Do stuff.
  });
  return (
    <div>
      <Container>
        <Row>
          <Col md="6">
            <Col>
              <text style={{ fontSize: "12px" }}>
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
              <Image
                className=" login-img-res img-custom"
                src={WebCamImg}
                fluid
              />
              <Col
                style={{
                  position: "relative",
                  top: "-30px",
                  textAlign: "center",
                }}
              >
                <div className="ico-msg m-1">
                  <div>
                    <HiOutlineLightBulb className="glass-hat-icon" />
                    <div style={{ fontSize: "9px" }}>Bright Light</div>
                    <CheckCircleIcon
                      style={{ fontSize: "20px", color: "green" }}
                    />
                  </div>
                </div>
                <div className="ico-msg m-1">
                  <div>
                    <GiSunglasses className="glass-hat-icon" />
                    <div style={{ fontSize: "9px" }}>No Glasses</div>
                    <CancelIcon style={{ fontSize: "20px", color: "red" }} />
                  </div>
                </div>
                <div className="ico-msg m-1">
                  <div>
                    <FaRedhat className="glass-hat-icon" />
                    <div style={{ fontSize: "9px" }}>No Hat</div>
                    <CancelIcon style={{ fontSize: "20px", color: "red" }} />
                  </div>
                </div>
                <div className="ico-msg m-1">
                  <div>
                    <RiSurgicalMaskLine className="glass-hat-icon" />
                    <div style={{ fontSize: "9px" }}>No Mask</div>
                    <CancelIcon style={{ fontSize: "20px", color: "red" }} />
                  </div>
                </div>
              </Col>
            </Col>
          </Col>
          <Col md="6">
            <div style={{ textAlign: "center", marginTop: 30 }}>
              {" "}
              <VideoRecord
                sendToParent={sendToParent}
                style={{ width: `20vw` }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WebCam;
