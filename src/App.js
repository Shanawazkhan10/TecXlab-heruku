import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import VerifyContact from "./components/E-kyc/VerifyContact/verifyContact";
import PanBankEmail from "./components/E-kyc/PanBankEmail/PanBankEmail";
// import VerifyPin from './components/E-kyc/verifyPin';
import SignUp from "./components/E-kyc/signupComponent";
// import AllowAccess from './components/E-kyc/allowAccess';
import EmailTemplate from "./components/E-kyc/EmailTemplate";
import PanOrc from "./components/E-kyc/panOrc";
import ProtectedPages from "./components/E-kyc/ProtectedPage/ProtectedPages";
import ConfirmPage from "./components/E-kyc/confirmPage/ConfirmPage";
import Razor from "./components/E-kyc/RazorPay/Razor";
import DigiLock from "./components/E-kyc/DigiLock/DigiLock";
import PersonalInfo from "./components/E-kyc/PersonalInfo/PersonalInfo";
import DashBoard from "./components/E-kyc/DashBoard/DashBoard";
// import VideoRecord from "./components/E-kyc/VideoRecord/VideoRecord";
import Header from "./components/E-kyc/Header/Header";
import LastStep from "./components/E-kyc/LastStep/LastStep";
import FnoNominee from "./components/E-kyc/FnoNominee/FnoNominee";
import AdhaarKyc from "./components/E-kyc/AdhaarKyc/AdhaarKyc";
// import AccountOpen from "./components/E-kyc/AccountOpen/OpenAcc";
import UploadDocuments from "./components/E-kyc/UploadDocuments/UploadDocuments";
import UploadDocs from "./components/E-kyc/UploadDocuments/UploadDocsUi";
import AccountOpen from "./components/E-kyc/AccountOpen/AccOpenInfo";
import VideoKyc from "./components/E-kyc/VideoRecord/WebCam";
// import Esign from './components/E-kyc/DigitalSignature/Esign';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          {/* {localStorage.getItem("user-token") === null && (
            <Route exact path="/verifyContact" component={VerifyContact} />
          )} */}
          {/* <Route exact path="/" component={DashBoard} /> */}
          {/* <Route exact path="/verifyPin" component={VerifyPin} /> */}
          {/* <Route exact path="/AllowAccess" component={AllowAccess} /> */}
          <Route path="/ConfirmPage" component={ConfirmPage} />
          <Route exact path="/Email" component={PanBankEmail} />
          <Route exact path="/EmailTemplate" component={EmailTemplate} />
          <Route exact path="/RazorPay" component={Razor} />
          <Route exact path="/DigiLock" component={DigiLock} />
          <Route exact path="/PersonalInfo" component={PersonalInfo} />
          <Route exact path="/DashBoard" component={DashBoard} />
          {/* <Route exact path="/VideoRecord" component={VideoRecord} /> */}
          <Route exact path="/" component={VerifyContact} />
          <Route exact path="/LastStep" component={LastStep} />
          <Route exact path="/FnoNominee" component={FnoNominee} />
          <Route exact path="/AdhaarKYC" component={AdhaarKyc} />
          <Route exact path="/AccountOpen" component={AccountOpen} />
          <Route exact path="/UploadDocuments" component={UploadDocuments} />
          <Route exact path="/UploadUi" component={UploadDocs} />
          <Route exact path="/IPVerification" component={VideoKyc} />
          {/* <Route exact path="/E-sign" component={Esign} /> */}
          <ProtectedPages path="/PanOrc" Cmp={PanOrc} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
