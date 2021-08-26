import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import VerifyContact from "./components/E-kyc/VerifyContact/verifyContact";
import PanBankEmail from "./components/E-kyc/PanBankEmail/PanBankEmail";
import VerifyPin from "./components/E-kyc/verifyPin";
import SignUp from "./components/E-kyc/signupComponent";
import AllowAccess from "./components/E-kyc/allowAccess";
import EmailTemplate from "./components/E-kyc/EmailTemplate";
import PanOrc from "./components/E-kyc/panOrc";
import ProtectedPages from "./components/E-kyc/ProtectedPage/ProtectedPages";
import ConfirmPage from "./components/E-kyc/confirmPage/ConfirmPage";
import Razor from "./components/E-kyc/RazorPay/Razor";
import DigiLock from "./components/E-kyc/DigiLock/DigiLock";
import PersonalInfo from "./components/E-kyc/PersonalInfo/PersonalInfo";
import DashBoard from "./components/E-kyc/DashBoard/DashBoard";
import VideoRecord from "./components/E-kyc/VideoRecord/VideoRecord";
import Header from "./components/E-kyc/Header/Header";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          {/* {localStorage.getItem("user-token") === null && (
            <Route exact path="/verifyContact" component={VerifyContact} />
          )} */}
          <Route exact path="/" component={DashBoard} />
          <Route exact path="/verifyPin" component={VerifyPin} />
          <Route exact path="/AllowAccess" component={AllowAccess} />
          <Route path="/ConfirmPage" component={ConfirmPage} />
          <Route exact path="/Email" component={PanBankEmail} />
          <Route exact path="/EmailTemplate" component={EmailTemplate} />
          <Route exact path="/RazorPay" component={Razor} />
          <Route exact path="/DigiLock" component={DigiLock} />
          <Route exact path="/PersonalInfo" component={PersonalInfo} />
          <Route exact path="/DashBoard" component={DashBoard} />
          <Route exact path="/VideoRecord" component={VideoRecord} />
          <Route exact path="/Mobile" component={VerifyContact} />
          <ProtectedPages path="/PanOrc" Cmp={PanOrc} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
