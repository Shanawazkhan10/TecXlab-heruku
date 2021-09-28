import React, { useState, useEffect } from "react";
import "./PersonalInfo.css";
import TextField from "@material-ui/core/TextField";
import { Container, Row, Col } from "reactstrap";
import Image from "react-bootstrap/Image";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { MenuItem } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import PersonalImg from "../../../images/Personal_Details_Illustration.png";
import { useHistory } from "react-router";
import SERVER_ID from "../Configure/configure";
// import Swal from "sweetalert2";
import { ORG_ID } from "../Helper/Helper";
const PersonalInfo = () => {
  const history = useHistory();
  // const [isBtnVisible, SetIsBtnVisible] = useState(true);
  const [inputs, setInputs] = useState({
    mstatus: "",
    income: "",
    gender: "",
    political: "",
    occupation: "",
    experience: "",
    motherName: "",
    fatherName: "",
    education: "",
  });
  const [errorMsg, seterrorMsg] = useState({
    errorOBJ: {
      errorFatherName: "",
      errorMotherName: "",
      errorMstatus: "",
      errorGender: "",
      errorIncome: "",
      errorOccupation: "",
      errorExperience: "",
      errorPolitical: "",
      errorEducation: "",
    },
  });
  // const history = useHistory();
  const { control } = useForm();
  // const useStyles = makeStyles((theme) => ({
  //   formControl: {
  //     minWidth: 300,
  //   },
  // }));
  // const classes = useStyles();
  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  // useEffect(() => {
  //   const unsuscribe = () => {
  //     if (
  //       inputs.fatherName &&
  //       inputs.motherName &&
  //       inputs.income &&
  //       inputs.gender &&
  //       inputs.mstatus &&
  //       inputs.political &&
  //       inputs.occupation &&
  //       inputs.experience &&
  //       inputs.education !== ""
  //     ) {
  //       SetIsBtnVisible(false);
  //     } else {
  //       SetIsBtnVisible(true);
  //     }
  //   };
  //   return unsuscribe();
  // }, [inputs]);

  useEffect(() => {
    if (inputs.fatherName !== "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorFatherName: "",
        },
      }));
    }
    if (inputs.motherName !== "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorMotherName: "",
        },
      }));
    }
    if (inputs.mstatus !== "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorMstatus: "",
        },
      }));
    }
    if (inputs.gender !== "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorGender: "",
        },
      }));
    }
    if (inputs.income !== "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorIncome: "",
        },
      }));
    }
    if (inputs.occupation !== "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorOccupation: "",
        },
      }));
    }
    if (inputs.experience !== "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorExperience: "",
        },
      }));
    }
    if (inputs.political !== "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorPolitical: "",
        },
      }));
    }
    if (inputs.education !== "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorEducation: "",
        },
      }));
    }
  }, [
    inputs.fatherName,
    inputs.motherName,
    inputs.mstatus,
    inputs.gender,
    inputs.income,
    inputs.occupation,
    inputs.experience,
    inputs.political,
    inputs.education,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const {name,value}=e.target;
    if (inputs.fatherName === "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorFatherName: "please provide  your fathername",
        },
      }));
    }
    if (inputs.motherName === "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorMotherName: "please provide  your mothername",
        },
      }));
    }
    if (inputs.mstatus === "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorMstatus: "please provide your Marital Status",
        },
      }));
    }
    if (inputs.gender === "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorGender: "please select your gender",
        },
      }));
    }
    if (inputs.income === "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorIncome: "please select your income",
        },
      }));
    }
    if (inputs.occupation === "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorOccupation: "please select your occupation",
        },
      }));
    }
    if (inputs.experience === "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorExperience: "please select your experience",
        },
      }));
    }
    if (inputs.political === "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorPolitical: "please provide this field ",
        },
      }));
    }
    if (inputs.education === "") {
      seterrorMsg((prevState) => ({
        ...prevState,
        errorOBJ: {
          ...prevState.errorOBJ,
          errorEducation: "please select your education",
        },
      }));
    }
    // if()
    if (
      inputs.fatherName !== "" &&
      inputs.motherName !== "" &&
      inputs.mstatus !== "" &&
      inputs.gender !== "" &&
      inputs.experience !== "" &&
      inputs.occupation !== "" &&
      inputs.income !== "" &&
      inputs.political !== "" &&
      inputs.education !== ""
    ) {
      // API FOR PERSONAL
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("userToken")}`
      );
      var raw = JSON.stringify({
        org_Id: ORG_ID,
        lead_Id: localStorage.getItem("lead_Id"),
        father_Name: inputs.fatherName,
        mother_Name: inputs.motherName,
        income: inputs.income,
        gender: inputs.gender,
        marital_Status: inputs.mstatus,
        politicalExposed: inputs.political,
        occupation: inputs.occupation,
        trading_Experience: inputs.experience,
        education: inputs.education,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${SERVER_ID}/api/personal/Personal_Details`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          // var myHeaders = new Headers();
          // myHeaders.append("Content-Type", "application/json");
          // myHeaders.append(
          //   "Authorization",
          //   `Bearer ${localStorage.getItem("userToken")}`
          // );
          // var raw = JSON.stringify({
          //   method_Name: "Update_Stage_Id",
          //   org_Id: ORG_ID,
          //   lead_Id: localStorage.getItem("lead_Id"),
          // });

          // var requestOptions = {
          //   method: "POST",
          //   headers: myHeaders,
          //   body: raw,
          //   redirect: "follow",
          // };

          // fetch(`${SERVER_ID}/api/lead/Update_StageId`, requestOptions)
          //   .then((response) => response.text())
          //   .then((result) => console.log(result))
          //   .catch((error) => console.log("error", error));
          history.push("/IPV");
        })
        .catch((error) => console.log("error", error));
    }
    // window.location = "/PanOrc";
    // console.log(state);
  };
  return (
    <div>
      <Container>
        <Row>
          <Col className="m-4" md="6">
            <Image className="login-img-res" src={PersonalImg} fluid />
          </Col>
          <Col>
            <div className="form-info">
              <Row>
                <Col>
                  <h3 className="float-left">Personal Details</h3>
                  <br />
                  <hr className="hr-personal color-gradiant" />
                </Col>
              </Row>
              <Row>
                <Col md="6" sm="12" className="mt-2  div-center">
                  <div className="form-group master-textField">
                    <TextField
                      type="text"
                      error={
                        errorMsg.errorOBJ.errorFatherName === "" ? false : true
                      }
                      id="fieldSelectorname"
                      name="fatherName"
                      value={inputs.fatherName}
                      onChange={handleInputChange}
                      className="form-control"
                      label="Father's Full Name*"
                      autoComplete="off"
                      variant="outlined"
                      // id="outlined-error-helper-text"
                    />
                  </div>
                  {errorMsg.errorOBJ.errorFatherName && (
                    <div className="div-error">
                      <span className="error-msg">
                        {errorMsg.errorOBJ.errorFatherName}
                      </span>
                    </div>
                  )}
                </Col>

                <Col md="6" sm="12" className="mt-2">
                  <div className="form-group master-textField">
                    <TextField
                      error={
                        errorMsg.errorOBJ.errorMotherName === "" ? false : true
                      }
                      type="text"
                      id="fieldSelectorname"
                      name="motherName"
                      value={inputs.motherName}
                      onChange={handleInputChange}
                      className="form-control"
                      label="Mother's Full Name*"
                      autoComplete="off"
                      variant="outlined"
                    />
                  </div>
                  {errorMsg.errorOBJ.errorMotherName && (
                    <div className="div-error">
                      <span className="error-msg">
                        {errorMsg.errorOBJ.errorMotherName}
                      </span>
                    </div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col md="6" sm="12" className="mt-2">
                  <div className=" master-textField">
                    <FormControl
                      variant="outlined"
                      key="Marital Status"
                      fullWidth
                      error={
                        errorMsg.errorOBJ.errorMstatus === "" ? false : true
                      }
                    >
                      <InputLabel>Marital Status*</InputLabel>
                      <Controller
                        render={() => (
                          <Select
                            size="large"
                            name="mstatus"
                            variant="outlined"
                            value={inputs.mstatus}
                            // value={inputs.mstatus}
                            onChange={handleInputChange}
                            label="Marital Status"
                          >
                            <MenuItem disabled>Marital Status</MenuItem>
                            <MenuItem value={"Single"}>Single</MenuItem>
                            <MenuItem value={"Married"}>Married</MenuItem>
                            <MenuItem value={"Others"}>Others</MenuItem>
                          </Select>
                        )}
                        // name="mstatus"
                        control={control}
                        // value=""
                      />
                    </FormControl>
                  </div>
                  {errorMsg.errorOBJ.errorMstatus && (
                    <div className="div-error">
                      <span className="error-msg">
                        {errorMsg.errorOBJ.errorMstatus}
                      </span>
                    </div>
                  )}
                </Col>
                <Col md="6" sm="12" className="mt-2">
                  <div className=" master-textField">
                    <FormControl
                      error={
                        errorMsg.errorOBJ.errorGender === "" ? false : true
                      }
                      variant="outlined"
                      key="Appliances"
                      fullWidth
                    >
                      <InputLabel required={true}>Gender</InputLabel>
                      <Controller
                        render={() => (
                          <Select
                            size="large"
                            name="gender"
                            value={inputs.gender}
                            onChange={handleInputChange}
                            label="Gender"
                          >
                            <MenuItem disabled>Gender</MenuItem>
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                            <MenuItem value={"Others"}>Others</MenuItem>
                          </Select>
                        )}
                        name="appliance"
                        control={control}
                        // value=""
                        rules={{
                          required: "Please Choose Your Appliance.",
                        }}
                      />
                      {/* <FormHelperText>{errors.appliance?.message}</FormHelperText> */}
                    </FormControl>
                  </div>
                  {errorMsg.errorOBJ.errorGender && (
                    <div className="div-error">
                      <span className="error-msg">
                        {errorMsg.errorOBJ.errorGender}
                      </span>
                    </div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col className="mt-2" md="6" sm="12">
                  <h3 className="float-left">Background</h3>
                  <br />
                  <hr className="hr-personal color-gradiant" />
                </Col>
              </Row>
              <Row>
                <Col md="6" sm="12" className="mt-2">
                  <div className=" master-textField">
                    <FormControl
                      error={
                        errorMsg.errorOBJ.errorIncome === "" ? false : true
                      }
                      variant="outlined"
                      key="Annual Income"
                      // error={Boolean(errors.appliance)}
                      fullWidth
                    >
                      <InputLabel required={true}>Annual Income</InputLabel>
                      <Controller
                        render={(props) => (
                          <Select
                            size="large"
                            name="income"
                            variant="outlined"
                            value={inputs.income}
                            onChange={handleInputChange}
                            label="Annual Income"
                          >
                            <MenuItem disabled>Annual Income</MenuItem>
                            <MenuItem value={"less then 500000"}>
                              less then 50,0000
                            </MenuItem>
                            <MenuItem value={"More then 500000"}>
                              More then 50,0000
                            </MenuItem>
                            <MenuItem value={"less then 1000000"}>
                              less then 1,00,0000
                            </MenuItem>
                            <MenuItem value={"More then 1000000"}>
                              More then 1,00,0000
                            </MenuItem>
                            {/* <MenuItem value={"Trash Compactor"}>Trash Compactor</MenuItem> */}
                          </Select>
                        )}
                        name="appliance"
                        control={control}
                        value=""
                        rules={{
                          required: "Please Choose Your Appliance.",
                        }}
                      />
                      {/* <FormHelperText>{errors.appliance?.message}</FormHelperText> */}
                    </FormControl>
                  </div>
                  {errorMsg.errorOBJ.errorIncome && (
                    <div className="div-error">
                      <span className="error-msg">
                        {errorMsg.errorOBJ.errorIncome}
                      </span>
                    </div>
                  )}
                </Col>
                <Col md="6" sm="12" className="mt-2 ">
                  <div className="master-textField">
                    <FormControl
                      error={
                        errorMsg.errorOBJ.errorOccupation === "" ? false : true
                      }
                      variant="outlined"
                      key="Appliances"
                      // error={Boolean(errors.appliance)}
                      fullWidth
                    >
                      <InputLabel required={true}>Occupation</InputLabel>
                      <Controller
                        render={(props) => (
                          <Select
                            size="large"
                            name="occupation"
                            value={inputs.occupation}
                            onChange={handleInputChange}
                            label="occupation"
                          >
                            <MenuItem value="" disabled>
                              Occupation
                            </MenuItem>
                            <MenuItem value={"Private Sector Service "}>
                              Private Sector Service
                            </MenuItem>
                            <MenuItem value={"Govt. Sector"}>
                              Govt. Sector
                            </MenuItem>
                            <MenuItem value={"Retired"}>Retired</MenuItem>
                            <MenuItem value={"Agriculturist"}>
                              Agriculturist
                            </MenuItem>
                            <MenuItem value={"Student"}>Student</MenuItem>
                            <MenuItem value={"Forex Dealer"}>
                              Forex Dealer
                            </MenuItem>
                            <MenuItem value={"Business"}>Business</MenuItem>
                            <MenuItem value={"Government Service"}>
                              Government Service
                            </MenuItem>
                            <MenuItem value={"Housewife"}>Housewife</MenuItem>
                            <MenuItem value={"Others"}>Others</MenuItem>
                            {/* <MenuItem value={"Range"}>Range</MenuItem>
                  <MenuItem value={"Trash Compactor"}>Trash Compactor</MenuItem> */}
                          </Select>
                        )}
                        name="appliance"
                        control={control}
                        value=""
                        rules={{
                          required: "Please Choose Your Appliance.",
                        }}
                      />
                      {/* <FormHelperText>{errors.appliance?.message}</FormHelperText> */}
                    </FormControl>
                  </div>
                  {errorMsg.errorOBJ.errorOccupation && (
                    <div className="div-error">
                      <span className="error-msg">
                        {errorMsg.errorOBJ.errorOccupation}
                      </span>
                    </div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col md="6" sm="12" className="mt-2">
                  <div className="form-group master-textField">
                    <FormControl
                      error={
                        errorMsg.errorOBJ.errorExperience === "" ? false : true
                      }
                      variant="outlined"
                      key="Appliances"
                      // error={Boolean(errors.appliance)}
                      fullWidth
                    >
                      <InputLabel required={true}>
                        Trading Experience
                      </InputLabel>
                      <Controller
                        render={(props) => (
                          <Select
                            size="large"
                            name="experience"
                            value={inputs.experience}
                            onChange={handleInputChange}
                            label="Trading Experience"
                          >
                            <MenuItem value="" disabled>
                              Trading Experience
                            </MenuItem>
                            <MenuItem value={"Beginner"}>Beginner</MenuItem>
                            <MenuItem value={"Intermediate"}>
                              Intermediate
                            </MenuItem>
                            <MenuItem value={"Advanced"}>Advanced</MenuItem>
                            {/* <MenuItem value={"Range"}>Range</MenuItem>
                  <MenuItem value={"Trash Compactor"}>Trash Compactor</MenuItem> */}
                          </Select>
                        )}
                        name="appliance"
                        control={control}
                        value=""
                        rules={{
                          required: "Please Choose Your Appliance.",
                        }}
                      />
                      {/* <FormHelperText>{errors.appliance?.message}</FormHelperText> */}
                    </FormControl>
                    {errorMsg.errorOBJ.errorExperience && (
                      <div className="div-error">
                        <span className="error-msg">
                          {errorMsg.errorOBJ.errorExperience}
                        </span>
                      </div>
                    )}
                  </div>
                </Col>
                <Col md="6" sm="12" className="mt-2">
                  <div className="form-group master-textField inside_div_personal">
                    <FormControl
                      error={
                        errorMsg.errorOBJ.errorPolitical === "" ? false : true
                      }
                      variant="outlined"
                      key="Appliances"
                      // error={Boolean(errors.appliance)}
                      fullWidth
                    >
                      <InputLabel required={true}>
                        Politically Exposed
                      </InputLabel>
                      <Controller
                        render={(props) => (
                          <Select
                            size="large"
                            name="political"
                            value={inputs.political}
                            onChange={handleInputChange}
                            label="Politically Exposed"
                          >
                            <MenuItem value="" disabled>
                              Politically Exposed
                            </MenuItem>
                            <MenuItem value={"yes"}>Yes</MenuItem>
                            <MenuItem value={"no"}>No</MenuItem>
                          </Select>
                        )}
                        name="appliance"
                        control={control}
                        value=""
                        rules={{
                          required: "Please Choose Your Appliance.",
                        }}
                      />
                    </FormControl>
                    {errorMsg.errorOBJ.errorPolitical && (
                      <div className="div-error">
                        <span className="error-msg">
                          {errorMsg.errorOBJ.errorPolitical}
                        </span>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className="div_personal">
                <Col md="6" sm="12" className="mt-2">
                  <div className="form-group master-textField">
                    <FormControl
                      error={
                        errorMsg.errorOBJ.errorEducation === "" ? false : true
                      }
                      variant="outlined"
                      key="Appliances"
                      // error={Boolean(errors.appliance)}
                      fullWidth
                    >
                      <InputLabel required={true}>Education</InputLabel>
                      <Controller
                        render={(props) => (
                          <Select
                            size="large"
                            name="education"
                            value={inputs.education}
                            onChange={handleInputChange}
                            label="education"
                          >
                            <MenuItem value="" disabled>
                              Education
                            </MenuItem>
                            <MenuItem value={"Formal Education."}>
                              Formal Education.
                            </MenuItem>
                            <MenuItem value={"Informal Education."}>
                              Informal Education.
                            </MenuItem>
                            <MenuItem value={"Non-formal Education."}>
                              Non-formal Education.
                            </MenuItem>
                            {/* <MenuItem value={"Range"}>Range</MenuItem>
                  <MenuItem value={"Trash Compactor"}>Trash Compactor</MenuItem> */}
                          </Select>
                        )}
                        name="appliance"
                        control={control}
                        value=""
                        rules={{
                          required: "Please Choose Your Appliance.",
                        }}
                      />
                      {/* <FormHelperText>{errors.appliance?.message}</FormHelperText> */}
                    </FormControl>
                    {errorMsg.errorOBJ.errorEducation && (
                      <div className="div-error">
                        <span className="error-msg">
                          {errorMsg.errorOBJ.errorEducation}
                        </span>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="3"></Col>
                <Col md="6">
                  <Button
                    fullWidth
                    type="submit"
                    // disabled={isBtnVisible}
                    onClick={handleSubmit}
                    className="btn-comman text-white"
                    // disabled={isBtnVisible}
                  >
                    Proceed
                  </Button>
                </Col>
                <Col md="3"></Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <br />
    </div>
  );
};

export default PersonalInfo;
// <form style={{ textAlign: "center" }}>
// <h3> Personal Details</h3>
// <select class="select">
//   <option
//     name="mstatus"
//     value={inputs.mstatus}
//     onChange={(e) => handleInputChange}
//     selected
//     disabled
//   >
//     Marital status
//   </option>
//   <option value="1">Single</option>
//   <option value="2">Married</option>
//   <option value="3">Divorced</option>
// </select>
// <br />
// <br />
// <select class="select">
//   <option name="income" value={inputs.income} selected disabled>
//     Income
//   </option>
//   <option value="1">Below 500000</option>
//   <option value="2">Above 500000</option>
// </select>
// <br />
// <br />
// <select class="select">
//   <option
//     // value=""
//     selected
//     disabled
//   >
//     Is Political Exposed
//   </option>
//   <option value="Yes">Yes</option>
//   <option value="2">No</option>
// </select>
// <br />
// <TextField
//   value={inputs.fatherName}
//   name="fatherName"
//   onChange={handleInputChange}
//   id="standard-basic"
//   label="Father Full Name"
// />
// <br />
// <TextField
//   value={inputs.motherName}
//   name="motherName"
//   onChange={handleInputChange}
//   id="standard-basic"
//   label="Mother Full Name"
// />
// <br />
// <br />
// <button
//   className="btn btn-primary"
//   onClick={handleSubmit}
// >
//   Submit
// </button>
// </form>
