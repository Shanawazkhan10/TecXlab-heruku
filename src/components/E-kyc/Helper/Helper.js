import $ from "jquery";
import { useHistory } from "react-router-dom";
const ORG_ID = "S001";

function conVal() {
  $("#fieldSelectorNo").keypress(function (e) {
    var length = $(this).val().length;
    if (length > 9) {
      return false;
    } else if (
      e.which !== 8 &&
      e.which !== 0 &&
      (e.which < 48 || e.which > 57)
    ) {
      return false;
    } else if (length === 0 && e.which === 48) {
      return false;
    }
  });
}
function OtpVal() {
  $("#fieldOtp").keypress(function (e) {
    var length = $(this).val().length;
    if (length > 5) {
      return false;
    } else if (
      e.which !== 8 &&
      e.which !== 0 &&
      (e.which < 48 || e.which > 57)
    ) {
      return false;
    } else if (length === 0 && e.which === 48) {
      return false;
    }
  });
}
function mobileOtp() {
  $("#mobileOtp").keypress(function (e) {
    var length = $(this).val().length;
    if (length > 5) {
      return false;
    } else if (
      e.which !== 8 &&
      e.which !== 0 &&
      (e.which < 48 || e.which > 57)
    ) {
      return false;
    } else if (length === 0 && e.which === 48) {
      return false;
    }
  });
}
function IfscValidator() {
  $("#fieldSelectorNo").keypress(function (e) {
    var length = $(this).val().length;
    if (length > 10) {
      return false;
    } else if (
      e.which !== 8 &&
      e.which !== 0 &&
      (e.which < 48 || e.which > 57)
    ) {
      return false;
    } else if (length === 0 && e.which === 48) {
      return false;
    }
  });
}
function namVal() {
  $("#fieldSelectorname").keypress(function (e) {
    var length = $(this).val().length;
    if (length > 25) {
      return false;
    }
  });
}
function Space() {
  // $(function () {
  // $(document).ready(function () {
  $("#space").keydown(function (event) {
    if (event.keyCode == 32) {
      event.preventDefault();
    }
  });
  // });
  // });
}
//geolocation function
function getLocation(callback) {
  $.ajax({
    url: "https://geolocation-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function (location) {
      callback(location);
      // return data;
    },
  });
}
// function successFunction(position) {
//   var lat = position.coords.latitude;
//   var long = position.coords.longitude;
//   console.log("Your latitude is :" + lat + " and longitude is " + long);
// }
// handle success case
function Routing() {
  let history = useHistory();
  const id = localStorage.getItem("raw");
  switch (id) {
    case 1:
      history.push("/Email");
      break;
    case 2:
      history.push("/Account");
      break;
    case 3:
      history.push("/AdhaarKyc");
      break;
    case 4:
      history.push("/Personal");
      break;
    case 5:
      history.push("/IPV");
      break;
    case 6:
      history.push("/Document");
      break;
    case 7:
      history.push("/Esign");
      break;
    case 8:
      history.push("/FnoNominee");
      break;

    default:
      history.push("/");
      break;
  }
}
export {
  conVal,
  namVal,
  getLocation,
  IfscValidator,
  OtpVal,
  mobileOtp,
  Space,
  Routing,
  ORG_ID,
};
