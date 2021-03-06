import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import VerifyContact from "./components/E-kyc/VerifyContact/verifyContact";
import PanBankEmail from "./components/E-kyc/PanBankEmail/PanBankEmail";
// import VerifyPin from './components/E-kyc/verifyPin';
// import SignUp from './components/E-kyc/signupComponent';
// import AllowAccess from './components/E-kyc/allowAccess';
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
// import UploadDocuments from './components/E-kyc/UploadDocuments/UploadDocuments';
import UploadDocs from "./components/E-kyc/UploadDocuments/UploadDocsUi";
import AccountOpen from "./components/E-kyc/AccountOpen/AccOpenInfo";
import VideoKyc from "./components/E-kyc/VideoRecord/WebCam";
import EmailConfirm from "./components/E-kyc/EmailConfirm/EmailConfirm";
// import Esign from './components/E-kyc/DigitalSignature/Esign';
// import ReLinkPage from "./components/E-kyc/SubComponent/Redirect";
// import Redirect from "./components/E-kyc/SubComponent/Redirect";
import Redirect from "./components/E-kyc/DigilockRedirect/Redirect";
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
          <Route exact path="/RazorPay" component={Razor} />
          <Route exact path="/abc" component={DigiLock} />
          <Route exact path="/Personal" component={PersonalInfo} />
          <Route exact path="/DashBoard" component={DashBoard} />
          {/* <Route exact path="/VideoRecord" component={VideoRecord} /> */}
          <Route exact path="/" component={VerifyContact} />
          <Route exact path="/Esign" component={LastStep} />
          <Route exact path="/FnoNominee" component={FnoNominee} />
          <Route exact path="/Digilocker" component={AdhaarKyc} />
          <Route exact path="/Account" component={AccountOpen} />
          {/* <Route exact path="/UploadDocuments" component={UploadDocuments} /> */}
          <Route exact path="/Document" component={UploadDocs} />
          <Route exact path="/IPV" component={VideoKyc} />
          <Route exact path="/EmailConfirm" component={EmailConfirm} />
          <Route path="/Redirect" component={Redirect} />
          {/* <Route exact path="/E-sign" component={Esign} /> */}
          <ProtectedPages path="/PanOrc" Cmp={PanOrc} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
