import React, { useState } from 'react';
// import './PersonalInfo.css';
import { Container, Row, Col } from 'reactstrap';
import { makeStyles } from '@material-ui/core';
import Image from 'react-bootstrap/Image';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Esign from '../DigitalSignature/Esign';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { useHistory } from 'react-router';
import uploadImg from '../../../images/Upload_Documents_Illustration.png';
import $ from 'jquery';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '#000',
    boxShadow: theme.shadows[5],
    borderRadius: '10px',
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
  const [photo, SetPhoto] = useState([]);
  const [digiSign, SetDigiSign] = useState([]);
  const [disable, SetDisable] = useState(false);
  const [preview, SetPreview] = useState(false);
  const [icoDisable, SetIcoDisable] = useState(false);

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
    $('#panCard').trigger('click');
  };
  const previewOpenHandler = () => {
    SetPreview(true);
    SetIcoDisable(true);
  };
  const previewCloseHandler = () => {
    SetPreview(false);
  };

  const ImageHandler = (eve) => {
    if (eve.target.files) {
      const fileArray = Array.from(eve.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      console.log(fileArray);
      SetPhoto((revImg) => revImg.concat(fileArray));
      Array.from(eve.target.files).map((image) => URL.revokeObjectURL(image));
    }
    SetDisable(true);
  };

  const RendImageHandler = (src) => {
    return src.map((Img, idx) => {
      return (
        <>
          <div style={{ textAlign: 'center' }}>
            <img src={Img} key={idx} alt="Image" width="150px" height="150px" />
            <br />
            <Button type="submit" onClick={previewOpenHandler}>
              <CheckCircleIcon />
            </Button>
            <Button
              type="submit"
              disabled={icoDisable}
              onClick={previewOpenHandler}
            >
              <VisibilityIcon />
            </Button>
            <Button type="submit" onClick={HandleOpen}>
              <DeleteIcon />
            </Button>
          </div>
        </>
      );
    });
  };
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
    // SetDisable(true);
  };

  const RendImg = (src) => {
    return src.map((Img, idx) => {
      return (
        <>
          <img src={Img} key={idx} alt="Image" width="150px" height="150px" />
          <br />
          <button type="submit">Test1</button>
          <button type="submit">Test2</button>
          <button type="submit">Test3</button>
        </>
      );
    });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <p style={{ marginLeft: '12px' }}>Upload Signature</p>
        <CloseRoundedIcon
          onClick={handleClose}
          style={{ marginRight: '12px', cursor: 'pointer' }}
        />
      </Row>
      <Esign />
    </div>
  );
  const PreviewModal = (
    <div style={modalStyle} className={classes.paper}>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <p>Preview your image</p>
        <CloseRoundedIcon
          onClick={previewCloseHandler}
          style={{ marginRight: '12px', cursor: 'pointer' }}
        />
      </Row>
      <Col>
        <div>{RendImageHandler(photo)}</div>
      </Col>
    </div>
  );

  return (
    <div>
      <Container
        // style={{ border: '1px solid red' }}
        className="container-md"
        fluid
        // style={{ border: '2px solid blue' }}
      >
        <Row>
          <Col
            md="7"
            //  style={{ border: '2px solid black' }}
          >
            <div className="form-info">
              <Row>
                <Col style={{ marginLeft: '30px' }}>
                  <h3 className="float-left ml=2">Upload Documents</h3>
                  <br />
                  <hr className="hr-personal color-gradiant" />
                </Col>
              </Row>
              <br />
              <Container
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  // border: '3px solid blue',
                }}
              >
                <Col>
                  <text>
                    <b>Copy of PAN</b>
                  </text>
                  <br />
                  <br />
                  <text>Upload a signed copy of your PAN Card</text>
                  <br />
                  <text style={{ fontSize: '10px' }}>
                    Format: <b>PNG</b>,<b>JPG</b>,<b>JPEG </b>
                  </text>
                  <br />
                  <br />
                  <input
                    id="panCard"
                    onChange={(e) => ImageHandler(e)}
                    type="file"
                    style={{ display: 'none' }}
                    // accept=".png, .jpeg, .jpeg, .pdf"
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
                <Col>
                  <div>{RendImageHandler(photo)}</div>
                </Col>
                <Modal
                  open={preview}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {PreviewModal}
                </Modal>
              </Container>
              <hr />
              <Container>
                <Col md="12">
                  <text>
                    <b>Signature</b>
                  </text>
                </Col>
                <br />
                <Row>
                  <Col
                    style={{
                      fontSize: '13px',
                      // border: '1px solid red',
                    }}
                  >
                    <div>
                      Please sign on a blank paper with a pen & <br /> upload a
                      photo of the same. You can also <br /> sign on the digital
                      pad.
                    </div>
                  </Col>
                  <Col>
                    <div>{RendImg(digiSign)}</div>
                  </Col>
                </Row>
                <br />
                <br />
                <Row>
                  <Col>
                    <Button
                      type="submit"
                      onClick={HandleOpen}
                      className="btn-comman text-white"
                      style={{
                        textTransform: 'capitalize',
                      }}
                    >
                      Digital Pad
                    </Button>
                    <Modal
                      open={show}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      {body}
                    </Modal>
                  </Col>
                  <Col>
                    <input
                      id="panCard"
                      onChange={(e) => EsignHandler(e)}
                      type="file"
                      style={{ display: 'none' }}
                      // accept=".png, .jpeg, .jpeg, .pdf"
                    />
                    <Button
                      type="submit"
                      onClick={handleTrigger}
                      className="btn-comman text-white"
                      style={{
                        textTransform: 'capitalize',
                      }}
                    >
                      Upload Image
                    </Button>
                  </Col>
                </Row>
              </Container>
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
