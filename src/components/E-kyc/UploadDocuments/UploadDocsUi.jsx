import React, { useState } from "react";
// import './PersonalInfo.css';
import { Container, Row, Col } from "reactstrap";
import { makeStyles } from "@material-ui/core";
import Image from "react-bootstrap/Image";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Esign from "../DigitalSignature/Esign";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { useHistory } from "react-router";
import uploadImg from "../../../images/Upload_Documents_Illustration.png";
import $ from "jquery";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./UploadDocs.css";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "#000",
    boxShadow: theme.shadows[5],
    borderRadius: "10px",
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const AdhaarKyc = () => {
  const history = useHistory();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [show, SetShow] = useState(false);
  const [digiSign, SetDigiSign] = useState([]);
  const [disable, SetDisable] = useState(false);
  const [preview, SetPreview] = useState(false);
  const [icoDisable, SetIcoDisable] = useState(false);
  const [dataUri, setDataUri] = useState("");
  const [dataSign, setDataSign] = useState("");
  const HandleOpen = () => {
    SetShow(true);
  };
  const handleClose = () => {
    SetShow(false);
  };
  const handleClick = () => {
    // history.push('/LastStep');
  };
  const handleTrigger = () => {
    $("#panCard").trigger("click");
  };
  const handleTriggerSign = () => {
    $("#UploadSign").trigger("click");
  };
  const previewOpenHandler = () => {
    SetPreview(true);
    SetIcoDisable(true);
  };
  const previewCloseHandler = () => {
    SetPreview(false);
  };

  function uploadFile(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      console.log("Encoded Base 64 File String:", reader.result);
      setDataUri(reader.result);
    };
    reader.readAsDataURL(file);
  }
  function uploadSign(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      console.log("Encoded Base 64 File String:", reader.result);
      setDataSign(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const EsignHandler = (event) => {
    if (event.target.files) {
      const DigiFileArray = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      console.log(DigiFileArray);
      SetDigiSign((revImg) => revImg.concat(DigiFileArray));
      console.log(SetDigiSign);
      Array.from(event.target.files).map((data) => URL.revokeObjectURL(data));
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p style={{ marginLeft: "12px" }}>Upload Signature</p>
        <CloseRoundedIcon
          onClick={handleClose}
          style={{ marginRight: "12px", cursor: "pointer" }}
        />
      </Row>
      <Esign />
    </div>
  );
  const PreviewModal = (
    <div style={modalStyle} className={classes.paper}>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>Preview your image</p>
        <CloseRoundedIcon
          onClick={previewCloseHandler}
          style={{ marginRight: "12px", cursor: "pointer" }}
        />
      </Row>
    </div>
  );

  return (
    <div>
      <Modal
        open={preview}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {PreviewModal}
      </Modal>
      <Modal
        open={show}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Container className="container-md" fluid>
        <Row>
          <Col md="7">
            <div className="form-info">
              <Row>
                <Col md="7">
                  <Row>
                    <Col>
                      {" "}
                      <h3 className="float-left">Upload Documents</h3>
                      <br />
                      <hr className="hr-personal color-gradiant" />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {" "}
                      <h4>Copy of PAN</h4>
                      {/* <br /> */}
                      {/* <br /> */}
                      <div className="mt-3">
                        <text>Upload a signed copy of your PAN Card</text>
                      </div>
                      {/* <br /> */}
                      <text style={{ fontSize: "11px" }}>
                        Format: PNG,JPG,JPEG
                      </text>
                      <br />
                      <br />
                      <input
                        id="panCard"
                        onChange={(event) => uploadFile(event)}
                        type="file"
                        style={{ display: "none" }}
                      />
                      <Button
                        type="file"
                        className="btn-comman text-white"
                        onClick={handleTrigger}
                        disabled={disable}
                      >
                        Upload
                      </Button>
                    </Col>
                  </Row>
                </Col>
                {dataUri && (
                  <Col md="5">
                    <Row>
                      <Col className="text-center">
                        {" "}
                        {
                          <img
                            className="image-select"
                            width="200"
                            height="180"
                            src={dataUri}
                            alt="avatar"
                          />
                        }
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center mt-2">
                        <div>
                          <CheckCircleIcon />
                          &nbsp; &nbsp;
                          <VisibilityIcon />
                          &nbsp; &nbsp;
                          <DeleteIcon />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                )}
              </Row>

              <br />
              <hr />
              {/* <Container> */}
              <Row>
                <Col md="7">
                  <Row>
                    <Col>
                      <h4>Signature</h4>
                      {/* <br /> */}
                      <div className="mt-3">
                        Please sign on a blank paper with a pen & <br /> upload
                        a photo of the same. You can also <br /> sign on the
                        digital pad.
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    {/* <Col> */}
                    <Col md="4" sm="6">
                      <Button
                        type="submit"
                        onClick={HandleOpen}
                        className="btn-comman-small  text-white"
                        style={{
                          textTransform: "capitalize",
                        }}
                      >
                        Digital Pad
                      </Button>
                    </Col>
                    <Col md="4" sm="6">
                      <input
                        id="UploadSign"
                        // onChange={(event) =>
                        //   handleSign(event.target.files[0] || null)
                        // }
                        onChange={(event) => uploadSign(event)}
                        type="file"
                        style={{ display: "none" }}
                        accept=".png, .jpg, .jpeg, .pdf,"
                        hidden
                      />
                      <Button
                        type="submit"
                        onClick={handleTriggerSign}
                        className="btn-comman-small  text-white"
                        style={{
                          textTransform: "capitalize",
                        }}
                      >
                        Upload Image
                      </Button>
                    </Col>
                    {/* </Col> */}
                  </Row>
                </Col>
                {dataSign && (
                  <Col md="5">
                    <Row>
                      <Col className="text-center">
                        {" "}
                        {
                          <img
                            width="200"
                            className="image-select"
                            height="135"
                            src={dataSign}
                            alt="avatar"
                          />
                        }
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center mt-2">
                        <div>
                          <CheckCircleIcon />
                          &nbsp; &nbsp;
                          <VisibilityIcon />
                          &nbsp; &nbsp;
                          <DeleteIcon />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                )}
              </Row>
              {/* </Container> */}
            </div>
          </Col>
          <Col className="mt-5 ml-5" md="4">
            <Image src={uploadImg} fluid />
          </Col>
        </Row>
      </Container>
      <br />
    </div>
  );
};

export default AdhaarKyc;
