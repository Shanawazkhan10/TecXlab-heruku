import React, { useState, useEffect } from "react";
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
// import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from "@material-ui/core/DialogContent";
import ImageCropper from "../SubComponent/ImageCropper";
import "./UploadDocs.css";
// import { Viewer } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import { Worker } from '@react-pdf-viewer/core';
import { ORG_ID } from "../Helper/Helper";
import SERVER_ID from "../Configure/configure";
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
  const [Data1, setData1] = useState("");
  const [Data2, setData2] = useState("");

  const [stage_id, SetStage_id] = useState(null);
  // const [isSet, setisSet] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [errorMsg, seterrorMsg] = useState({
    errorOBJ: {
      errorFile1: "",
      errorFile2: "",
    },
  });
  // Pdf Hooks
  // const [fileData, SetFileData] = useState(null);
  // const [fileError, SetFileError] = useState('');
  // const [fileViewer, SetFileViewer] = useState(null);
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // for check if KRA VERIFIED
  useEffect(() => {
    console.log("wdcwd");
    const unsuscribe = async () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("userToken")}`
      );
      var raw = JSON.stringify(
        // lead_Id: localStorage.getItem("lead_Id"),
        {
          lead_ID: localStorage.getItem("lead_Id"),
        }
      );

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        `${SERVER_ID}/api/documentupload/Document_Upload_Check`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          SetStage_id(result.res_Output[0].is_Kra_Verified);
        })
        .catch((error) => console.log("error", error));
    };
    unsuscribe();
  }, []);
  useEffect(() => {
    const unsuscribe = async () => {
      // getResponse();
      if (Data2 !== "") {
        let response = await fetch(croppedImage2);
        let data = await response.blob();
        let metadata = {
          type: "image/jpeg",
        };
        let file1 = new File([data], "SignImg.jpg", metadata);
        // ... do something with the file or return it
        console.log(file1);

        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          `Bearer ${localStorage.getItem("userToken")}`
        );

        var formdata = new FormData();
        formdata.append("lead_ID", localStorage.getItem("lead_Id"));
        formdata.append("front_part", file1);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        fetch(
          `${SERVER_ID}/api/documentupload/Document_Upload_Signature`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      }
    };
    unsuscribe();
  }, [Data2]);
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
    setData1(croppedImage1);
    // setOpen1(false);
    // var file = new File([croppedImage1], "panCard");
    //api call
    // var file = new File([croppedImage1], "panCard", {
    //   lastModified: 1534584790000,
    // });
    // var file = new File([croppedImage1], "panCard", {
    //   type: "image/jpeg",
    //   lastModified: Date.now(),
    // });
    // console.log(file);

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    var formdata = new FormData();
    formdata.append("Mobile_No", localStorage.getItem("userInfo"));

    // async function createFile() {
    let response = await fetch(croppedImage1);
    let data = await response.blob();
    let metadata = {
      type: "image/jpeg",
    };
    let file = new File([data], "pan.jpg", metadata);
    // ... do something with the file or return it
    console.log(file);
    // }
    // createFile();

    // formdata.append("front_part", blob, "image.jpeg");

    formdata.append("front_part", file);

    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${SERVER_ID}/api/documentupload/Document_Upload_PAN`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  const handleClickCrop = async () => {
    setData2(croppedImage2);
    setOpen1(false);
    // api call
    // var file1 = new File([croppedImage2], "Signature", {
    //   type: "image/jpeg",
    //   lastModified: Date.now(),
    // });
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
    // console.log("console pic", event.target.files[0]);
    if (event.target.files && event.target.files.length > 0) {
      // console.log(event.target.name);
      if (event.target.name === "file1") {
        if (event.target.files[0].size > 2097152) {
          seterrorMsg((prevState) => ({
            ...prevState,
            errorOBJ: {
              ...prevState.errorOBJ,
              errorFile1: "File size Exceed",
            },
          }));
          return;
        } else {
          seterrorMsg((prevState) => ({
            ...prevState,
            errorOBJ: {
              ...prevState.errorOBJ,
              errorFile1: "",
            },
          }));
        }
        // console.log(event.target.files[0].size);
        setOpen(true);
        const reader = new FileReader();
        reader.addEventListener("load", () => setImageToCrop(reader.result));
        reader.readAsDataURL(event.target.files[0]);
      } else {
        if (event.target.files[0].size > 2097152) {
          seterrorMsg((prevState) => ({
            ...prevState,
            errorOBJ: {
              ...prevState.errorOBJ,
              errorFile2: "File size Exceed",
            },
          }));
          return;
        } else {
          seterrorMsg((prevState) => ({
            ...prevState,
            errorOBJ: {
              ...prevState.errorOBJ,
              errorFile2: "",
            },
          }));
        }
        setOpen1(true);
        const reader = new FileReader();
        reader.addEventListener("load", () => setImageToCrop(reader.result));
        reader.readAsDataURL(event.target.files[0]);
      }
    }
    // console.log("2nd console pic", event.target.files[0]);
  };

  //Pdf Functions

  // const fileType = ['application/pdf'];

  // const handlePdfFileChange = (e) => {
  //   let selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     if (selectedFile && fileType.includes(selectedFile.type)) {
  //       // console.log(selectedFile.type);
  //       let reader = new FileReader();
  //       reader.readAsDataURL(selectedFile);
  //       reader.onloadend = (e) => {
  //         SetFileData(e.target.result);
  //         SetFileError('');
  //         // console.log("Reader:", reader.result);
  //       };
  //     } else {
  //       SetFileData(null);
  //       SetFileError('Please select only JPEG, PNG, PDF files only');
  //     }
  //   } else {
  //     console.log('select your file');
  //   }
  // };

  // const handlePdfFileSubmit = (e) => {
  //   e.preventDefault();
  //   if (fileData !== null) {
  //     SetFileViewer(fileData);
  //   } else {
  //     SetFileViewer(null);
  //   }
  // };

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
    // console.log("Upload UI:", data);
    if (data !== "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorFile2: "",
        },
      }));

      setData2(data);
    }
    // console.log(Digidata);
  };

  const HandleModalCloser = () => {
    SetShow(false);
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
      <Esign EsignData={EsignData} HandleModalCloser={HandleModalCloser} />
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

  const handlePush = () => {
    if (Data1 === "") {
      alert("Please upload PAN image");
    }
    if (Data2 === "") {
      alert("Please upload sign image");
    }
    if (Data1 && Data2 !== "") {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("userToken")}`
      );
      var raw = JSON.stringify({
        method_Name: "Update_Stage_Id",
        org_Id: ORG_ID,
        lead_Id: localStorage.getItem("lead_Id"),
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${SERVER_ID}/api/lead/Update_StageId`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      history.push("/Esign");
    }
  };

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
              // console.log(croppedImage);
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
          <Button onClick={handleClickCrop} color="primary">
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
              {stage_id === 0 && (
                <div>
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
                            // onInput={handlePdfFileChange}
                            // onBlur={handlePdfFileSubmit}
                            onChange={(event) => onUploadFile(event)}
                            onClick={(event) => {
                              event.target.value = null;
                            }}
                            id="PanId"
                            style={{ display: "none" }}
                          />
                          <Button
                            // fullWidth
                            style={{ width: "245px" }}
                            type="file"
                            className="btn-comman text-white"
                            onClick={handleTrigger}
                            disabled={disable}
                          >
                            Upload
                          </Button>
                        </Col>
                        {/* {fileError && (
                      <sapn style={{ color: 'red' }}>{fileError}</sapn>
                    )} */}
                      </Row>
                      <div>
                        {errorMsg.errorOBJ.errorFile1 && (
                          <span className="error-file">
                            {errorMsg.errorOBJ.errorFile1}
                          </span>
                        )}
                      </div>
                    </Col>
                    {Data1 && (
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
                                src={Data1}
                              />
                            }
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-center mt-2">
                            <div>
                              <CheckCircleIcon
                                style={{ color: "green", cursor: "pointer" }}
                              />
                              &nbsp; &nbsp;
                              <VisibilityIcon style={{ color: "#7f00ff" }} />
                              &nbsp; &nbsp;
                              <DeleteIcon
                                color="secondary"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setData1("");
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
                </div>
              )}
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
                        onClick={(event) => {
                          event.target.value = null;
                        }}
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
                  <div>
                    {errorMsg.errorOBJ.errorFile2 && (
                      <span className="error-file">
                        {errorMsg.errorOBJ.errorFile2}
                      </span>
                    )}
                  </div>
                  {/* <br /> */}
                  <Button
                    type="submit"
                    onClick={handlePush}
                    className="btn-comman-small mt-2  text-white"
                    style={{
                      textTransform: "capitalize",
                      width: "245px",
                    }}
                  >
                    Proceed
                  </Button>
                </Col>
                {/* {Digidata && (
                  <Col md="5">
                    <Row>
                      <Col className="text-center">
                        {' '}
                        {
                          <img
                            alt="Cropped Img"
                            className="image-select"
                            width="200"
                            height="180"
                            alt="avatar"
                            src={Digidata}
                          />
                        }
                      </Col>
                    </Row>
                  </Col>
                )} */}
                {Data2 && (
                  <Col md="5">
                    <Row>
                      <Col className="text-center">
                        <img
                          alt="Cropped Img"
                          className="image-select"
                          width="200"
                          height="180"
                          src={Data2}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center mt-2">
                        <div>
                          <CheckCircleIcon
                            style={{ color: "green", cursor: "pointer" }}
                          />
                          &nbsp; &nbsp;
                          <VisibilityIcon style={{ color: "#7f00ff" }} />
                          &nbsp; &nbsp;
                          <DeleteIcon
                            style={{ cursor: "pointer" }}
                            color="secondary"
                            onClick={() => {
                              setData2("");
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
