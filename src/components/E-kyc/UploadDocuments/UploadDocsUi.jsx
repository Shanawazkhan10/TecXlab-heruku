import React, { useState } from 'react';
// import './PersonalInfo.css';
import { Container, Row, Col } from 'reactstrap';
import { makeStyles } from '@material-ui/core';
import Image from 'react-bootstrap/Image';
import DigiModal from '../Modal/Modal';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Esign from '../DigitalSignature/Esign';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
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
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [show, SetShow] = useState(false);

  const HandleOpen = () => {
    SetShow(true);
  };
  const handleClose = () => {
    SetShow(false);
  };

  const body = (
    <div
      style={modalStyle}
      // style={{ borderRadius: '15px' }}
      className={classes.paper}
    >
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

  return (
    <div>
      <Container className="container-md">
        <Row>
          <Col md="6">
            <div className="form-info">
              <Row>
                <Col style={{ marginLeft: '30px' }}>
                  <h3 className="float-left ml=2">Upload Documents</h3>
                  <br />
                  <hr className="hr-personal color-gradiant" />
                </Col>
              </Row>
              <br />
              <Container>
                <Col>
                  <text>
                    <b>Copy of PAN</b>
                  </text>
                </Col>
                <br />
                <Col
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: '13px',
                  }}
                >
                  <text>Upload a signed copy of your PAN Card</text>
                  <text style={{ fontSize: '10px' }}>
                    Format: <b>JPG</b>,<b>PNG</b>,<b>PDF</b>
                  </text>
                </Col>
                <br />
                <Button
                  type="submit"
                  // fullWidth
                  // onClick={smsVerify}
                  className="btn-comman text-white"
                  style={{
                    textTransform: 'capitalize',
                    marginLeft: '10px',
                    width: '150px',
                  }}
                >
                  Upload
                </Button>
              </Container>
              <hr className="hr" />
              {/* <br /> */}
              <Container>
                <Col>
                  <text>
                    <b>Signature</b>
                  </text>
                </Col>
                <br />
                <Col
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: '13px',
                  }}
                >
                  <text>
                    Please sign on a blank paper with a pen & upload a photo of
                    the same.
                  </text>
                  <text>You can also sign on the digital pad.</text>
                </Col>
                <br />
                <Row
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Col md="6">
                    <Button
                      type="submit"
                      onClick={HandleOpen}
                      className="btn-comman text-white"
                      style={{
                        textTransform: 'capitalize',
                        marginLeft: '10px',
                        width: '150px',
                      }}
                    >
                      Digital Pad
                    </Button>
                    <Modal
                      open={show}
                      // onClose={handleClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      {body}
                    </Modal>
                  </Col>
                  <Col>
                    <Button
                      type="submit"
                      // onClick={smsVerify}
                      className="btn-comman text-white"
                      style={{
                        textTransform: 'capitalize',
                        marginLeft: '10px',
                        width: '150px',
                      }}
                    >
                      Upload Image
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col
            className="mt-5 ml-5 p-4"
            md="5"
            // style={{ border: '2px solid black' }}
          >
            <Image
              src={require('../../../images/Upload_Documents_Illustration.png')}
              fluid
            />
          </Col>
        </Row>
      </Container>
      <br />
    </div>
  );
};

export default AdhaarKyc;
