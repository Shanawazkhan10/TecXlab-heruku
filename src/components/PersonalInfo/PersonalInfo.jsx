import React, { useState } from "react";
import "./PersonalInfo.css";
import TextField from "@material-ui/core/TextField";
import { Container, Row, Col } from 'reactstrap'
// import SubInputAdornment from '../SubComponent/SubInputAdornment'
import Image from 'react-bootstrap/Image'
// import { MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, MenuItem } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import { useForm, Controller } from "react-hook-form";
// import React from 'react';
import Button from '@material-ui/core/Button';
const PersonalInfo = () => {
  const [inputs, setInputs] = useState({
    mstatus: "",
    income: "",
    political: "",
    motherName: "",
    fatherName: "",
  });
  const { control } = useForm();
  const useStyles = makeStyles(theme => ({
    formControl: {
      minWidth: 300
    }
  }));  
  const classes = useStyles();
  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    window.location = "/PanOrc";
    // console.log(state);
  };
  return (
    <div>
      <Container>
        <Row>
          <Col md="6">
          sss
          </Col>
          <Col>
          <div className="form-info">
          <Row>
            <Col>
            <h3 className="float-left">Personal Details
            </h3>     
            <br/> 
            <hr className="hr-personal color-gradiant"/>
            </Col>
          </Row>
          <Row>
         
         
            <Col md="6" sm="12" className="mt-2  div-center">

            <div  className="form-group master-textField">
              <TextField
                type="text"
    
                id="fieldSelectorname"
                // onChange={handleNameChange}
                className="form-control"
                label="Father's Full Name"
                autoComplete="off"
                variant="outlined"
              />
               </div>
    
            </Col>
   
            <Col md="6" sm="12" className="mt-2">
            <div  className="form-group master-textField">
              <TextField
                type="text"
                id="fieldSelectorname"
                // onChange={handleNameChange}
                className="form-control"
                label="Mother's Full Name"
                autoComplete="off"
                variant="outlined"
              />
               </div>
            </Col>
          </Row>
          <Row className="">
            <Col md="6" sm="12" className="mt-3">
              <div className="form-group master-textField">
              <FormControl
            variant="outlined"
            key="Marital Status"
            // error={Boolean(errors.appliance)}
            fullWidth
          >
            <InputLabel required={true}>Marital Status</InputLabel>
            <Controller
              render={(props) => (
                <Select
                  size="large"
                  value={props.value}
                  onChange={props.onChange}
                  label="Marital Status"
                >
                  <MenuItem value="" disabled>
                  Marital Status
                  </MenuItem>
                  <MenuItem value={"Refrigerator"}>Single</MenuItem>
                  <MenuItem value={"Freezer"}>Married</MenuItem>
                  <MenuItem value={"Ice Maker"}>Divorced</MenuItem>
                  {/* <MenuItem value={"Range"}>Range</MenuItem>
                  <MenuItem value={"Trash Compactor"}>Trash Compactor</MenuItem> */}
                </Select>
              )}
              name="appliance"
              control={control}
              defaultValue=""
              rules={{
                required: "Please Choose Your Appliance."
              }}
            />
            {/* <FormHelperText>{errors.appliance?.message}</FormHelperText> */}
          </FormControl>
               </div>
            </Col>
            <Col md="6" sm="12" className="mt-3"> 
            <div className="form-group  master-textField">
            <FormControl
            variant="outlined"
            key="Appliances"
            // error={Boolean(errors.appliance)}
            fullWidth
          >
            <InputLabel required={true}>Gender</InputLabel>
            <Controller
              render={(props) => (
                <Select
                  size="large"
                  value={props.value}
                  onChange={props.onChange}
                  label="Gender"
                >
                  <MenuItem value="" disabled>
                    Gender
                  </MenuItem>
                  <MenuItem value={"Refrigerator"}>Male</MenuItem>
                  <MenuItem value={"Freezer"}>Female</MenuItem>
                  <MenuItem value={"Ice Maker"}>Other</MenuItem>
                  {/* <MenuItem value={"Range"}>Range</MenuItem>
                  <MenuItem value={"Trash Compactor"}>Trash Compactor</MenuItem> */}
                </Select>
              )}
              name="appliance"
              control={control}
              defaultValue=""
              rules={{
                required: "Please Choose Your Appliance."
              }}
            />
            {/* <FormHelperText>{errors.appliance?.message}</FormHelperText> */}
          </FormControl>
               </div>
            </Col>
          </Row>
          <Row>
            <Col className="mt-2" md="6" sm="12">
            <h3 className="float-left">Background
            </h3>     
            <br/> 
            <hr className="hr-personal color-gradiant"/> 
            </Col>
          </Row>
          <Row>
            <Col md="6" sm="12" className="mt-2">
            <div className=" master-textField">
            <FormControl
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
                  value={props.value}
                  onChange={props.onChange}
                  label="Appliances"
                >
                  <MenuItem value="" disabled>
                  Annual Income
                  </MenuItem>
                  <MenuItem value={"Refrigerator"}>less then 500000</MenuItem>
                  <MenuItem value={"Freezer"}>More then 500000</MenuItem>
                  <MenuItem value={"Ice Maker"}>less then 1000000</MenuItem>
                  <MenuItem value={"Range"}>More then 1000000</MenuItem>
                  {/* <MenuItem value={"Trash Compactor"}>Trash Compactor</MenuItem> */}
                </Select>
              )}
              name="appliance"
              control={control}
              defaultValue=""
              rules={{
                required: "Please Choose Your Appliance."
              }}
            />
            {/* <FormHelperText>{errors.appliance?.message}</FormHelperText> */}
          </FormControl>
               </div>
            </Col>
            <Col md="6" sm="12" className="mt-2">
            <div className="form-group master-textField">
            <FormControl
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
                  value={props.value}
                  onChange={props.onChange}
                  label="Appliances"
                >
                  <MenuItem value="" disabled>
                    Occupation
                  </MenuItem>
                  <MenuItem value={"Refrigerator"}>Private Sector</MenuItem>
                  <MenuItem value={"Freezer"}>Govt. Sector</MenuItem>
                  <MenuItem value={"Ice Maker"}>Self</MenuItem>
                  {/* <MenuItem value={"Range"}>Range</MenuItem>
                  <MenuItem value={"Trash Compactor"}>Trash Compactor</MenuItem> */}
                </Select>
              )}
              name="appliance"
              control={control}
              defaultValue=""
              rules={{
                required: "Please Choose Your Appliance."
              }}
            />
            {/* <FormHelperText>{errors.appliance?.message}</FormHelperText> */}
          </FormControl>
               </div>
            </Col>
          </Row>
          <Row className="">
          <Col md="6" sm="12" >
            <div className="form-group master-textField">
            <FormControl
            variant="outlined"
            key="Appliances"
            // error={Boolean(errors.appliance)}
            fullWidth
          >
            <InputLabel required={true}>Trading Experience</InputLabel>
            <Controller
              render={(props) => (
                <Select
                  size="large"
                  value={props.value}
                  onChange={props.onChange}
                  label="Appliances"
                >
                  <MenuItem value="" disabled>
                  Trading Experience
                  </MenuItem>
                  <MenuItem value={"Refrigerator"}>Begginer</MenuItem>
                  <MenuItem value={"Freezer"}>Intermediate</MenuItem>
                  <MenuItem value={"Ice Maker"}>Advanced</MenuItem>
                  {/* <MenuItem value={"Range"}>Range</MenuItem>
                  <MenuItem value={"Trash Compactor"}>Trash Compactor</MenuItem> */}
                </Select>
              )}
              name="appliance"
              control={control}
              defaultValue=""
              rules={{
                required: "Please Choose Your Appliance."
              }}
            />
            {/* <FormHelperText>{errors.appliance?.message}</FormHelperText> */}
          </FormControl>
               </div>
            </Col>
            <Col md="6" sm="12">
            <div className="form-group master-textField">
            <FormControl
            variant="outlined"
            key="Appliances"
            // error={Boolean(errors.appliance)}
            fullWidth
          >
            <InputLabel required={true}>Politically Exposed</InputLabel>
            <Controller
              render={(props) => (
                <Select
                  size="large"
                  value={props.value}
                  onChange={props.onChange}
                  label="Appliances"
                >
                  <MenuItem value="" disabled>
                  Politically Exposed
                  </MenuItem>
                  <MenuItem value={"Refrigerator"}>Yes</MenuItem>
                  <MenuItem value={"Freezer"}>No</MenuItem>
                  {/* <MenuItem value={"Ice Maker"}>Ice Maker</MenuItem>
                  <MenuItem value={"Range"}>Range</MenuItem>
                  <MenuItem value={"Trash Compactor"}>Trash Compactor</MenuItem> */}
                </Select>
              )}
              name="appliance"
              control={control}
              defaultValue=""
              rules={{
                required: "Please Choose Your Appliance."
              }}
            />
            {/* <FormHelperText>{errors.appliance?.message}</FormHelperText> */}
          </FormControl>
               </div>
            </Col>
            
          </Row>
       <Row>
       <Col md="3"></Col>
       <Col md="6">
        <Button
        fullWidth="true"
                type="submit"
                // onClick={smsVerify}
                className="btn-comman text-white"
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
   <br/>
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
