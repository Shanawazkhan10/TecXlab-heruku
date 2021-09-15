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
// import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ImageCropper from "../SubComponent/ImageCropper";
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
  const [disable, SetDisable] = useState(false);
  const [preview, SetPreview] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(undefined);
  const [croppedImage1, setCroppedImage1] = useState(undefined);
  const [croppedImage2, setCroppedImage2] = useState(undefined);
  // const [isSet, setisSet] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const HandleOpen = () => {
    SetShow(true);
  };
  const handleClose = () => {
    SetShow(false);
    setOpen(false);
    setOpen1(false);
  };
  const handleClick = async () => {
    setOpen(false);
    setOpen1(false);
  };

  const previewCloseHandler = () => {
    SetPreview(false);
  };
  const handleTrigger = () => {
    $("#PanId").trigger("click");
  };
  const handleTriggerSign = () => {
    $("#SignId").trigger("click");
  };
  // function uploadSign(event) {
  //   var file = event.target.files[0];
  //   var reader = new FileReader();
  //   reader.onloadend = function () {
  //     console.log("Encoded Base 64 File String:", reader.result);
  //     setDataSign(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // }
  const onUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.name);
      if (event.target.name === "file1") {
        setOpen(true);
        const reader = new FileReader();
        reader.addEventListener("load", () => setImageToCrop(reader.result));
        reader.readAsDataURL(event.target.files[0]);
      } else {
        setOpen1(true);
        const reader = new FileReader();
        reader.addEventListener("load", () => setImageToCrop(reader.result));
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  };
  // const EsignHandler = (event) => {
  //   if (event.target.files) {
  //     const DigiFileArray = Array.from(event.target.files).map((file) =>
  //       URL.createObjectURL(file)
  //     );
  //     console.log(DigiFileArray);
  //     SetDigiSign((revImg) => revImg.concat(DigiFileArray));
  //     console.log(SetDigiSign);
  //     Array.from(event.target.files).map((data) => URL.revokeObjectURL(data));
  //   }
  // };
  const EsignData = (data) => {
    console.log("Upload UI:", data);
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
      <Esign EsignData={EsignData} />
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
        <DialogContent>
          <ImageCropper
            imageToCrop={imageToCrop}
            style={{ maxWidth: "100%" }}
            onImageCropped={(croppedImage) => {
              setCroppedImage1(croppedImage);
              console.log(croppedImage);
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClick} color="primary">
            CROP
          </Button>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open1}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
        <DialogContent>
          <ImageCropper
            imageToCrop={imageToCrop}
            style={{ maxWidth: "100%" }}
            onImageCropped={(croppedImage) => setCroppedImage2(croppedImage)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClick} color="primary">
            CROP
          </Button>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>

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
                        type="file"
                        accept="image/*"
                        name="file1"
                        // name="files"
                        onChange={(event) => onUploadFile(event)}
                        id="PanId"
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
                {croppedImage1 && (
                  <Col md="5">
                    <Row>
                      <Col className="text-center">
                        {" "}
                        {
                          <img
                            alt="Cropped Img"
                            className="image-select"
                            width="200"
                            height="180"
                            alt="avatar"
                            src={croppedImage1}
                          />
                        }
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center mt-2">
                        <div>
                          <CheckCircleIcon style={{ color: "green" }} />
                          &nbsp; &nbsp;
                          <VisibilityIcon style={{ color: "#7f00ff" }} />
                          &nbsp; &nbsp;
                          <DeleteIcon
                            color="secondary"
                            onClick={() => {
                              setCroppedImage1("");
                            }}
                          />
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
                        type="file"
                        accept="image/*"
                        name="file2"
                        // name="files"
                        onChange={(event) => onUploadFile(event)}
                        id="SignId"
                        style={{ display: "none" }}
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
                  <Row className="mt-2">
                    <br />
                    {/* <Row> */}
                    <Button
                      type="file"
                      className="btn-comman text-white"
                      onClick={() => {
                        history.push("FnoNominee");
                      }}
                      disabled={disable}
                    >
                      proceed
                    </Button>
                    {/* </Row> */}
                  </Row>
                </Col>
                {croppedImage2 && (
                  <Col md="5">
                    <Row>
                      <Col className="text-center">
                        {" "}
                        {
                          <img
                            alt="Cropped Img"
                            className="image-select"
                            width="200"
                            height="180"
                            alt="avatar"
                            src={croppedImage2}
                          />
                        }
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center mt-2">
                        <div>
                          <CheckCircleIcon style={{ color: "green" }} />
                          &nbsp; &nbsp;
                          <VisibilityIcon style={{ color: "#7f00ff" }} />
                          &nbsp; &nbsp;
                          <DeleteIcon
                            color="secondary"
                            onClick={() => {
                              setCroppedImage2("");
                            }}
                          />
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
